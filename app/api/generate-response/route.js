// route.js
export const runtime = 'edge';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const getApiKey = (model) => {
  if (model.startsWith("gpt")) return OPENAI_API_KEY;
  return undefined;
};

async function callOpenAI(message, model, apiKey) {
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: message }],
        stream: true,
      }),
    }
  );

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            const data = JSON.parse(line.slice(6));
            const content = data.choices[0]?.delta?.content || '';
            controller.enqueue(content);
          }
        }
      }
      controller.close();
    },
  });

  return stream;
}

async function generateAiResponse(message, model) {
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

export async function POST(request) {
  try {
    const { message, model } = await request.json();
    console.log("Received request:", { message, model });

    if (!message || !model) {
      return new Response(JSON.stringify({ error: "Message and model are required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const aiResponseStream = await generateAiResponse(message, model);
    return new Response(aiResponseStream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error("Error in handler:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(JSON.stringify({ error: "An error occurred while processing your request", details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: "This endpoint only supports POST requests" }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}