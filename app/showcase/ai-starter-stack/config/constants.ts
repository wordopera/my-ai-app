// Filepath: /app/showcase/ai-starter-stack/config
// Date: Aug 31
// Description: This file contains constants and configurations
//              for the AI response generation API, including
//              model prefixes and timeout settings.

// Define prefixes for different AI model providers
// These prefixes are used to route the request to the correct API based on the model name
export const MODEL_PREFIXES = {
    OPENAI: 'gpt',        // Prefix for OpenAI models
    ANTHROPIC: 'claude',  // Prefix for Anthropic models
    GEMINI: 'gemini',     // Prefix for Google Gemini models
    HUGGINGFACE: 'hf'     // Prefix for Hugging Face models
  };

  // Set a timeout for API calls to avoid long-running or hanging requests
// The API_TIMEOUT is set to 30 seconds
export const API_TIMEOUT = 30000; // 30 seconds

// last line