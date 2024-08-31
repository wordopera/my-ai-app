// Filepath: app/showcase/ai-starter-stack/components/Models.ts
// Date: August 31, 2024
// Description: This file defines available AI models and manages their display logic with a manual toggle for Hugging Face options.

// Map of model identifiers to human-readable names
export const modelMap = {
  "gpt-4o-mini": "GPT-4o Mini",
  "gpt-4o-mini-2024-07-18": "GPT-4o Mini (July)",
  "claude-3-sonnet-20240229": "Claude 3",
  "gemini-pro": "Gemini Pro",
  "hf-meta-llama/Llama-2-7b-chat-hf": "Llama-2 7B Chat",
  "hf-meta-llama/Llama-2-13b-chat-hf": "Llama-2 13B Chat"
};

export type ModelKey = keyof typeof modelMap;

// Manual flag to show or hide Hugging Face models
const showHuggingFaceModels = false; // Set to true to show Hugging Face options, false to hide them

// Filter models based on the manual flag
export const models: ModelKey[] = Object.keys(modelMap)
  .filter((model) => showHuggingFaceModels || !model.startsWith('hf-meta-llama')) as ModelKey[];

// Last line
