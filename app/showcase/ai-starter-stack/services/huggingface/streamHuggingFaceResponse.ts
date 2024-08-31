// Filepath: /app/showcase/ai-starter-stack/services/huggingface/streamHuggingFaceResponse.ts
// Date: Aug 31
// Description:

import { HfInference } from '@huggingface/inference'; // Import Hugging Face SDK for interacting with Hugging Face models
import { API_TIMEOUT, MODEL_PREFIXES } from '../../config/constants'; // Import constants
import { timeoutPromise } from '../../utils/timeoutPromise'; // helps in enforcing the API_TIMEOUT for all external API calls


// Function to stream responses from Hugging Face models
// This function communicates with Hugging Face's API and streams the response back to the client
export async function* streamHuggingFaceResponse(message: string, model: string) {
    // Initialize Hugging Face Inference client with the API key from environment variables
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
  
    // Make a request to the Hugging Face API for text generation
    const response = await timeoutPromise(hf.textGeneration({
      model: model.replace(MODEL_PREFIXES.HUGGINGFACE + '-', ''), // Strip the prefix to get the actual model name
      inputs: message, // Send the user message to the model
      parameters: {
        max_new_tokens: 200,           // Set the max number of new tokens to generate
        temperature: 0.7,              // Control randomness in the output
        top_p: 0.95,                   // Nucleus sampling parameter
        repetition_penalty: 1.15,      // Penalize repeated text
      },
    }), API_TIMEOUT); // Apply the timeout to the API call
    
    // Yield the generated text from the Hugging Face response
    yield response.generated_text;
  }





// last line