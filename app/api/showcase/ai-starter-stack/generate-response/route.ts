// ==========================================================
// File: /app/api/showcase/ai-starter-stack/generate-response/route.ts
// Date: August 30, 2024
// Description: This API route handles requests to generate AI responses
//              using various AI models such as OpenAI, Anthropic, Gemini, 
//              and Hugging Face. It streams the response back to the client 
//              in real-time, facilitating dynamic interaction with the models.
// Author: [Your Name]
// ==========================================================

import { NextRequest, NextResponse } from 'next/server'; // Import Next.js request and response types
import Anthropic from '@anthropic-ai/sdk';              // Import Anthropic AI SDK for interacting with Anthropic models
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import Google Generative AI SDK for Gemini models
import { HfInference } from '@huggingface/inference';    // Import Hugging Face SDK for Hugging Face models
import { MODEL_PREFIXES, API_TIMEOUT } from '../../../../showcase/ai-starter-stack/config/constants'; // Import constants
import { timeoutPromise } from '../../../../showcase/ai-starter-stack/utils/timeoutPromise'; // helps in enforcing the API_TIMEOUT for all external API calls
import { validateApiKey } from '../../../../showcase/ai-starter-stack/utils/apikeyValidation'; //
import { streamOpenAIResponse } from '../../../../showcase/ai-starter-stack/services/openai/streamOpenAIResponse';
import { streamAnthropicResponse } from '../../../../showcase/ai-starter-stack/services/anthropic/streamAnthropicResponse';
import { streamGeminiResponse } from '../../../../showcase/ai-starter-stack/services/gemini/streamGeminiResponse';
import { streamHuggingFaceResponse } from '../../../../showcase/ai-starter-stack/services/huggingface/streamHuggingFaceResponse';

// Main POST handler for the API route
// Processes incoming requests, validates inputs, checks API keys, and routes to the appropriate AI model
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body to extract message and model information
    const { message, model } = await request.json();

      // Validate that both message and model are provided in the request
    if (!message || !model) {
      // Return a 400 Bad Request response if either is missing
      return NextResponse.json({ error: 'Message and model are required' }, { status: 400 });
    }

// Use the validateApiKey function to check for API key errors
const apiKeyError = validateApiKey(model);
if (apiKeyError) {
  return apiKeyError; // Return the error response if validation fails
}

    // Create a ReadableStream to handle the streaming response
    // This allows for real-time streaming of AI responses back to the client
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Route the request to the appropriate streaming function based on the model prefix
          if (model.startsWith(MODEL_PREFIXES.OPENAI)) {
            // Stream responses from OpenAI models
            for await (const chunk of streamOpenAIResponse(message, model)) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
          } else if (model.startsWith(MODEL_PREFIXES.ANTHROPIC)) {
            // Stream responses from Anthropic models
            for await (const chunk of streamAnthropicResponse(message, model)) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }         
          } else if (model.startsWith(MODEL_PREFIXES.GEMINI)) {
            // Stream responses from Gemini models
            for await (const chunk of streamGeminiResponse(message, model)) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
          } else if (model.startsWith(MODEL_PREFIXES.HUGGINGFACE)) {
            // Stream responses from Hugging Face models
            for await (const chunk of streamHuggingFaceResponse(message, model)) {
              controller.enqueue(new TextEncoder().encode(chunk));
            }
          } else {
            // Throw an error if the model prefix is unsupported
            throw new Error('Unsupported model');
          }
          // Close the stream after processing is complete
          controller.close();
        } catch (error) {
          // Handle errors by logging and signaling an error in the stream
          console.error('Error streaming response:', error);
          controller.error(error);
        }
      }
    });

    // Return the stream as the response with 'text/plain' content type
    return new Response(stream, { headers: { 'Content-Type': 'text/plain' } });

  } catch (error) {
    // Handle any unexpected errors in the request processing
    console.error('Error handling POST request:', error);
    // Return a 500 Internal Server Error with an appropriate message
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
}



// ==========================================================
// End of File: /app/api/showcase/ai-starter-stack/generate-response/route.ts
// ==========================================================