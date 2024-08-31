// Filepath: /app/showcase/ai-starter-stack/services/gemini/streamGeminiResponse.ts
// Date: Aug 31
// Description:


import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_TIMEOUT, MODEL_PREFIXES} from '../../../../showcase/ai-starter-stack/config/constants';
import { timeoutPromise } from '../../../../showcase/ai-starter-stack/utils/timeoutPromise';


// Function to stream responses from Google's Gemini models
// This function communicates with Google's Gemini API and streams the response back to the client
export async function* streamGeminiResponse(message: string, model: string) {
    // Retrieve the Google API key from environment variables
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      // Throw an error if the Google API key is not set
      throw new Error('GOOGLE_API_KEY environment variable not set.');
    }
  
    // Initialize the Google Generative AI client with the API key
    const client = new GoogleGenerativeAI(apiKey);
    // Retrieve the specified Gemini model from the client
    const geminiModel = client.getGenerativeModel({ model: model });
  
    // Define generation configuration settings for Gemini
    const generationConfig = {
      temperature: 0.9,      // Control the randomness of the output
      topK: 1,               // Limit the set of tokens to consider
      topP: 1,               // Nucleus sampling parameter
      maxOutputTokens: 2048, // Set the maximum number of output tokens
    };
  
    try {
      // Generate a content stream from the Gemini model
      const result = await timeoutPromise(geminiModel.generateContentStream({
        contents: [{ role: 'user', parts: [{ text: message }] }], // Send the user message
        generationConfig, // Apply the generation configuration
      }), API_TIMEOUT);
  
      // Iterate over each chunk of the result stream
      for await (const chunk of result.stream) {
        const chunkText = chunk.text(); // Extract the text from each chunk
        if (chunkText) {
          yield chunkText; // Yield the text back to the stream
        }
      }
    } catch (error) {
      // Handle various error scenarios for Gemini API
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