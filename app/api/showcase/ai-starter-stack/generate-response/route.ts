// File: app/api/showcase/ai-starter-stack/generate-response/route.ts
// August 17, 2024

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

function structuredLog(level: string, message: string, context: Record<string, unknown>) {
  console.log(JSON.stringify({ level, message, context, timestamp: new Date().toISOString() }));
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface SupabaseInsertResult {
  id?: number;
  content: string;
  ai_response: string;
  model: string;
  created_at?: string;
}

async function* streamOpenAIResponse(message: string, model: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

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
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

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
            structuredLog('error', 'JSON parsing error in streamOpenAIResponse', { errorMessage: getErrorMessage(error) });
          }
        }
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        structuredLog('error', 'OpenAI API request timed out', { errorMessage: error.message });
      } else {
        structuredLog('error', 'Error in streamOpenAIResponse', { errorMessage: error.message });
      }
    } else {
      structuredLog('error', 'Unknown error in streamOpenAIResponse', { error: String(error) });
    }
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

          let retries = 3;
          while (retries > 0) {
            try {
              const { data, error } = await supabase
                .from('messages')
                .insert([{ content: message, ai_response: fullResponse, model }]);
             
              if (error) throw error;
              
              structuredLog('info', 'Successfully saved to Supabase', { data });
              break;
            } catch (error: unknown) {
              retries--;
              if (retries === 0) {
                structuredLog('error', 'Failed to save to Supabase after retries', { errorMessage: getErrorMessage(error) });
              } else {
                structuredLog('warn', `Supabase insert failed, retrying (${retries} attempts left)`, { errorMessage: getErrorMessage(error) });
                await sleep(1000 * (4 - retries)); // Exponential backoff: 1s, 2s, 3s
              }
            }
          }
        } catch (error: unknown) {
          structuredLog('error', 'Error in stream processing', { errorMessage: getErrorMessage(error) });
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error: unknown) {
    structuredLog('error', 'Error in POST handler', { errorMessage: getErrorMessage(error) });
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "This endpoint only supports POST requests" },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}