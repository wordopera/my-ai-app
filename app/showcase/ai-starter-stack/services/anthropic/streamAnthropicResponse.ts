// Filepath: /app/showcase/ai-starter-stack/services/anthropic/streamAnthropicResponse.ts
// Date: Aug 31
// Description:

import Anthropic from '@anthropic-ai/sdk'; // Import Anthropic AI SDK for interacting with Anthropic models
import { API_TIMEOUT, MODEL_PREFIXES } from '../../../../showcase/ai-starter-stack/config/constants'; // Import constants
import { timeoutPromise } from '../../../../showcase/ai-starter-stack/utils/timeoutPromise'; // helps in enforcing the API_TIMEOUT for all external API calls



// Function to stream responses from Anthropic models
// This function communicates with Anthropic's API and streams the response back to the client
export async function* streamAnthropicResponse(message: string, model: string) {
    // Initialize Anthropic client with the API key from environment variables
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  
    try {
      // Create a streaming message request using Anthropic's API
      const stream = await timeoutPromise(anthropic.messages.create({
        model: model,
        max_tokens: 1000, // Limit the response length
        messages: [{ role: 'user', content: [{ type: 'text', text: message }] }], // Send the user message
        stream: true, // Enable streaming of responses
      }), API_TIMEOUT);
  
      // Iterate over each chunk of the stream
      for await (const chunk of stream) {
        // Check if the chunk is a text delta and yield it
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          yield chunk.delta.text;
        }
      }
    } catch (error) {
      // Log and throw an error if the Anthropic API call fails
      console.error('Anthropic API Error:', error);
      throw new Error('Error in Anthropic API call: ' + (error as Error).message);
    }
  }
  





// last line