import { NextResponse } from "next/server";
import axios from "axios";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

// Load environment variables
const OPENAI_API_KEY = serverRuntimeConfig.OPENAI_API_KEY;

interface RequestBody {
  message: string;
  model: string;
}

function getApiKey(model: string): string | undefined {
  if (model.startsWith("gpt")) return OPENAI_API_KEY;
  return undefined;
}

async function callOpenAI(message: string, model: string, apiKey: string): Promise<string> {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: model,
      messages: [{ role: "user", content: message }],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0].message.content;
}

async function generateAiResponse(message: string, model: string): Promise<string> {
  console.log(`Generating AI response for model: ${model}`);
  const apiKey = getApiKey(model);
  if (!apiKey) {
    throw new Error(`API key not found for model: ${model}`);
  }

  if (model.startsWith("gpt")) {
    return await callOpenAI(message, model, apiKey);
  } else {
    throw new Error(`Unsupported model: ${model}`);
  }
}

export async function POST(request: Request) {
  try {
    const { message, model }: RequestBody = await request.json();
    console.log("Received request:", { message, model });

    if (!message || !model) {
      return NextResponse.json(
        { error: "Message and model are required" },
        { status: 400 }
      );
    }

    const aiResponse = await generateAiResponse(message, model);
    return NextResponse.json({ aiResponse });
  } catch (error) {
    console.error("Error in POST handler:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { error: "An error occurred while processing your request", details: errorMessage },
      { status: 500 }
    );
  }
}