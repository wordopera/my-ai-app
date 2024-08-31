// Filepath: app/showcase/ai-stgarter-stack/utils/apikeyValidation.ts
// Date Aug 31
// Description: 

import { NextResponse } from 'next/server';
import { MODEL_PREFIXES } from '../config/constants'; // Adjust the relative path if necessary

// Function to validate API keys based on the model prefix
export function validateApiKey(model: string) {
  // Log the status of various API keys for debugging purposes
  console.log('OpenAI-Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');
  console.log('Anthropic-Key:', process.env.ANTHROPIC_API_KEY ? 'Set' : 'Not set');
  console.log('Google-Key:', process.env.GOOGLE_API_KEY ? 'Set' : 'Not set');
  console.log('HF-Key:', process.env.HUGGINGFACE_API_KEY ? 'Set' : 'Not Set');

  // Check if the required API key is set for the selected model
  if (model.startsWith(MODEL_PREFIXES.OPENAI) && !process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key is not set' }, { status: 500 });
  }
  if (model.startsWith(MODEL_PREFIXES.ANTHROPIC) && !process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Anthropic API key is not set' }, { status: 500 });
  }
  if (model.startsWith(MODEL_PREFIXES.GEMINI) && !process.env.GOOGLE_API_KEY) {
    return NextResponse.json({ error: 'Google API key is not set' }, { status: 500 });
  }
  if (model.startsWith(MODEL_PREFIXES.HUGGINGFACE) && !process.env.HUGGINGFACE_API_KEY) {
    return NextResponse.json({ error: 'Hugging Face API key is not set' }, { status: 500 });
  }

  // Return null if no errors
  return null;
}


// last line