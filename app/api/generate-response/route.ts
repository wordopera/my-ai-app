import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
  auth: { persistSession: false },
});

async function* streamOpenAIResponse(message: string, model: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: message }],
      stream: true,
    }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error('Unable to read response');
  }

  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine === 'data: [DONE]') {
        return;
      }
      if (trimmedLine.startsWith('data: ')) {
        const jsonData = trimmedLine.slice(6);
        try {
          const data = JSON.parse(jsonData);
          const content = data.choices[0]?.delta?.content || '';
          if (content) {
            yield content;
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    }
  }
}

export async function POST(request: NextRequest) {
  const { message, model } = await request.json();

  if (!message || !model) {
    return NextResponse.json({ error: 'Message and model are required' }, { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let fullResponse = '';
        for await (const chunk of streamOpenAIResponse(message, model)) {
          controller.enqueue(new TextEncoder().encode(chunk));
          fullResponse += chunk;
        }
        controller.close();

        // Save to Supabase after the response is complete
        try {
          const { data, error } = await supabase
            .from('messages')
            .insert([{ 
              content: message, 
              ai_response: fullResponse,
              model: model  // Add the model field here
            }]);
          
          if (error) {
            console.error('Error saving to Supabase:', error);
          } else {
            console.log('Successfully saved to Supabase:', data);
          }
        } catch (error) {
          console.error('Error in Supabase operation:', error);
        }
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

export async function GET() {
  return NextResponse.json({ message: "This endpoint only supports POST requests" }, { status: 405 });
}