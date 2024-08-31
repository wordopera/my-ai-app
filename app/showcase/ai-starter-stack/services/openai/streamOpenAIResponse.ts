// Filepath: /app/showcase/ai-starter-stack/services/openai/streamOpenAIResponse.ts
// Date: Aug 31
// Description:

// Import necessary constants and utilities
import { API_TIMEOUT, MODEL_PREFIXES } from '../../config/constants'; // Import API_TIMEOUT constant
import { timeoutPromise } from '../../utils/timeoutPromise'; // Import timeoutPromise utility

// Function to stream responses from OpenAI models
// This function communicates with OpenAI's API and streams the response back to the client
export async function* streamOpenAIResponse(message: string, model: string) {
    // Make a POST request to OpenAI's chat completions API
    const response = await timeoutPromise(fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use the OpenAI API key from environment variables
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: message }], // Send the user message to the model
        stream: true, // Enable streaming of responses
      }),
    }), API_TIMEOUT); // Apply the timeout to the API call
  
    // Initialize a reader to read the streaming response
    const reader = response.body?.getReader();
    const decoder = new TextDecoder(); // TextDecoder to decode the streaming response
    let buffer = ''; // Buffer to accumulate response chunks
  
    // Process the streaming response in chunks
    while (true) {
      // Read the next chunk of data
      const { done, value } = await reader?.read() || {};
      if (done) break; // Exit if the stream is finished
      
      // Decode the chunk and add it to the buffer
      const chunk = decoder.decode(value);
      buffer += chunk;
      // Split the buffer into lines and filter out empty lines
      const lines = buffer.split('\n').filter(line => line.trim());
  
      // Iterate over each line to process the response
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === '[DONE]') return; // Exit if the '[DONE]' signal is encountered
        if (!line.startsWith('data: ')) continue; // Skip lines that do not contain data
  
        try {
          // Parse the JSON data from the line
          const json = JSON.parse(line.replace(/^data: /, ''));
          const { delta } = json.choices[0]; // Extract the delta content
          if (delta && delta.content) {
            yield delta.content; // Yield the content back to the stream
            buffer = ''; // Clear the buffer after processing
          }
        } catch (error) {
          // Handle parsing errors and incomplete chunks
          if (i === lines.length - 1) {
            buffer = line; // Retain the line if it's the last in the buffer
          } else {
            console.error('Error parsing JSON:', error, 'Line:', line);
            buffer = ''; // Clear the buffer on parse error
          }
        }
      }
    }
  }
  





// last line