// app/api/showcase/ai-starter-stack/generate-response/route.ts
// Aug 20, 2024

import { NextRequest, NextResponse } from 'next/server';

// The main POST handler function for the API route
export async function POST(request: NextRequest) {
  try {
    // Extract the message and model from the incoming JSON request
    const { message, model } = await request.json();

    console.log('OpenAI-Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');

    // Validate that both message and model are provided
    if (!message || !model) {
      // Return a 400 Bad Request response if either is missing
      return NextResponse.json({ error: 'Message and model are required' }, { status: 400 });
    }

    // Create a readable stream that will be used to stream the response from the OpenAI API to the client
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Use the streamOpenAIResponse generator to handle the streaming response from OpenAI
          for await (const chunk of streamOpenAIResponse(message, model)) {
            // Enqueue each chunk of data to be sent to the client
            controller.enqueue(new TextEncoder().encode(chunk));
          }
          // Close the stream when all data has been sent
          controller.close();
        } catch (error) {
          // Log any errors that occur during the streaming process
          console.error('Error streaming response:', error);
          // Signal that an error occurred in the stream
          controller.error(error);
        }
      }
    });

    // Return the stream as the response, setting the content type to plain text
    return new Response(stream, { headers: { 'Content-Type': 'text/plain' } });

  } catch (error) {
    // Log any errors that occur while handling the POST request
    console.error('Error handling POST request:', error);
    // Return a 500 Internal Server Error response if an unexpected error occurs
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
}

// Generator function that handles the streaming response from OpenAI's chat completion API
async function* streamOpenAIResponse(message: string, model: string) {
  // Send a POST request to the OpenAI chat completions API endpoint
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use the API key from environment variables
    },
    body: JSON.stringify({
      model: model, // The model to use, e.g., "gpt-3.5-turbo"
      messages: [{ role: "user", content: message }], // The user message to send to the model
      stream: true, // Enable streaming responses
    }),
  });

  // Create a reader to process the streamed response
  const reader = response.body?.getReader();
  const decoder = new TextDecoder(); // Create a text decoder to decode the streamed bytes
  let buffer = ''; // Buffer to accumulate partial JSON data

  // Continuously read from the stream until it's done
  while (true) {
    const { done, value } = await reader?.read() || {}; // Read a chunk of data from the stream
    if (done) break; // Exit the loop if the stream is complete

    const chunk = decoder.decode(value); // Decode the chunk into a string
    buffer += chunk; // Accumulate the chunk into the buffer
    const lines = buffer.split('\n').filter(line => line.trim()); // Split the chunk into lines and remove empty lines

    // Process each line of the streamed response
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip the "[DONE]" message
      if (line === '[DONE]') return;

      // Skip lines that don't start with "data: "
      if (!line.startsWith('data: ')) continue;

      try {
        // Parse the JSON data
        const json = JSON.parse(line.replace(/^data: /, ''));
        const { delta } = json.choices[0];

        if (delta && delta.content) {
          yield delta.content;  // Yield the new content to the client
          buffer = ''; // Clear buffer after yielding to avoid repetition
        }
      } catch (error) {
        // Handle incomplete JSON by checking the next line in the buffer
        if (i === lines.length - 1) {
          buffer = line; // Keep the incomplete line for the next chunk
        } else {
          console.error('Error parsing JSON:', error, 'Line:', line);
          buffer = ''; // Clear buffer if error is not due to an incomplete line
        }
      }
    }
  }
}

// last line