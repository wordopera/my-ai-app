// app/api/showcase/ai-starter-stack/generate-response/route.ts
// August 30, 2024

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_PREFIXES = {
  OPENAI: 'gpt',
  ANTHROPIC: 'claude',
  GEMINI: 'gemini'
};

const API_TIMEOUT = 30000; // 30 seconds

async function timeoutPromise<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('API call timed out')), ms)
    )
  ]);
}

export async function POST(request: NextRequest) {
  try {
    const { message, model } = await request.json();
    console.log('OpenAI-Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');
    console.log('Anthropic-Key:', process.env.ANTHROPIC_API_KEY ? 'Set' : 'Not set');
    console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY ? 'Set' : 'Not set');

    if (!message || !model) {
      return NextResponse.json({ error: 'Message and model are required' }, { status: 400 });
    }

    if (model.startsWith(MODEL_PREFIXES.OPENAI) && !process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key is not set' }, { status: 500 });
    }
    if (model.startsWith(MODEL_PREFIXES.ANTHROPIC) && !process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Anthropic API key is not set' }, { status: 500 });
    }
    if (model.startsWith(MODEL_PREFIXES.GEMINI) && !process.env.GOOGLE_API_KEY) {
      return NextResponse.json({ error: 'Google API key is not set' }, { status: 500 });
    }

    if (!Object.values(MODEL_PREFIXES).some(prefix => model.startsWith(prefix))) {
      return NextResponse.json({ error: 'Unsupported model' }, { status: 400 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (model.startsWith(MODEL_PREFIXES.OPENAI)) {
            for await (const chunk of streamOpenAIResponse(message, model)) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
          } else if (model.startsWith(MODEL_PREFIXES.ANTHROPIC)) {
            for await (const chunk of streamAnthropicResponse(message, model)) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }         
          } else if (model.startsWith(MODEL_PREFIXES.GEMINI)) {
            for await (const chunk of streamGeminiResponse(message, model)) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
          } else {
            throw new Error('Unsupported model');
          }
          controller.close();
        } catch (error) {
          console.error('Error streaming response:', error);
          controller.error(error);
        }
      }
    });

    return new Response(stream, { headers: { 'Content-Type': 'text/plain' } });

  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
}

async function* streamOpenAIResponse(message: string, model: string) {
  const response = await timeoutPromise(fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: message }],
      stream: true,
    }),
  }), API_TIMEOUT);

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader?.read() || {};
    if (done) break;
    
    const chunk = decoder.decode(value);
    buffer += chunk;
    const lines = buffer.split('\n').filter(line => line.trim());

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '[DONE]') return;
      if (!line.startsWith('data: ')) continue;

      try {
        const json = JSON.parse(line.replace(/^data: /, ''));
        const { delta } = json.choices[0];
        if (delta && delta.content) {
          yield delta.content;
          buffer = '';
        }
      } catch (error) {
        if (i === lines.length - 1) {
          buffer = line;
        } else {
          console.error('Error parsing JSON:', error, 'Line:', line);
          buffer = '';
        }
      }
    }
  }
}

async function* streamAnthropicResponse(message: string, model: string) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    const stream = await timeoutPromise(anthropic.messages.create({
      model: model,
      max_tokens: 1000,
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": message
            }
          ]
        }
      ],
      stream: true,
    }), API_TIMEOUT);

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        yield chunk.delta.text;
      }
    }
  } catch (error) {
    console.error('Anthropic API Error:', error);
    throw new Error('Error in Anthropic API call: ' + (error as Error).message);
  }
}

async function* streamGeminiResponse(message: string, model: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY environment variable not set.');
  }

  try {
    const client = new GoogleGenerativeAI(apiKey);
    const geminiModel = client.getGenerativeModel({ model: model });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const result = await timeoutPromise(geminiModel.generateContentStream({
      contents: [{ role: "user", parts: [{ text: message }] }],
      generationConfig,
    }), API_TIMEOUT);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        yield chunkText;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('API key not valid')) {
        console.error('Invalid Google API key');
        throw new Error('Invalid Google API key. Please check your credentials.');
      } else if (error.message.includes('model not found')) {
        console.error('Specified Gemini model not found');
        throw new Error('The specified Gemini model was not found. Please check the model name.');
      } else {
        console.error('Error in Gemini API call:', error);
        throw new Error('Error in Gemini API call: ' + error.message);
      }
    } else {
      console.error('Unknown error in Gemini API call:', error);
      throw new Error('Unknown error occurred during Gemini API call');
    }
  }
}

      // last line