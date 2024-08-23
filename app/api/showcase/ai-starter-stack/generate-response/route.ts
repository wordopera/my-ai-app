import { NextRequest, NextResponse } from 'next/server';
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  try {
    const { message, model } = await request.json();
    console.log('OpenAI-Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');
    console.log('Anthropic-Key:', process.env.ANTHROPIC_API_KEY ? 'Set' : 'Not set');

    if (!message || !model) {
      return NextResponse.json({ error: 'Message and model are required' }, { status: 400 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (model.startsWith('gpt')) {
            for await (const chunk of streamOpenAIResponse(message, model)) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
          } else if (model.startsWith('claude')) {
            for await (const chunk of streamAnthropicResponse(message, model)) {
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
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
  });

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
          buffer = line; // Keep the buffer if the line is incomplete
        } else {
          console.error('Error parsing JSON:', error, 'Line:', line);
          buffer = ''; // Clear buffer on error
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
    const stream = await anthropic.messages.create({
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
    });

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
