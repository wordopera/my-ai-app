// File: app/api/showcase/ai-starter-stack/generate-response/route.ts
// August 19, 2024

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Environment variables are not set correctly');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

function logError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error);
}

async function* streamOpenAIResponse(message: string, model: string) {
  try {
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

    if (!response.ok) {
      throw new Error(`OpenAI API responded with status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Unable to read response');
    }

    const decoder = new TextDecoder();
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
            logError(error, 'JSON parsing in streamOpenAIResponse');
          }
        }
      }
    }
  } catch (error) {
    logError(error, 'streamOpenAIResponse');
    yield JSON.stringify({ error: 'An error occurred while processing the request' });
  }
}

export async function POST(request: NextRequest) {
  try {
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

          try {
            const { data, error } = await supabase
              .from('messages')
              .insert([{ content: message, ai_response: fullResponse, model }]);
            
            if (error) {
              logError(error, 'Supabase insert');
            } else {
              console.log('Successfully saved to Supabase:', data);
            }
          } catch (error) {
            logError(error, 'Supabase operation');
          }
        } catch (error) {
          logError(error, 'Stream processing');
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    logError(error, 'POST handler');
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint only supports POST requests" },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

// last line