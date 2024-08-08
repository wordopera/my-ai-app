import os
from dotenv import load_dotenv
from litellm import completion

load_dotenv()

def get_api_key(model):
    if model.startswith("gpt"):
        return os.environ.get("PYTHON_OPENAI_API_KEY")
    elif model.startswith("claude"):
        return os.environ.get("PYTHON_ANTHROPIC_API_KEY")
    elif model.startswith("llama"):
        return os.environ.get("PYTHON_LLAMA_API_KEY")
    elif model.startswith("gemini"):
        return os.environ.get("PYTHON_GEMINI_API_KEY")
    else:
        raise ValueError(f"Unknown model: {model}")

def generate_ai_response(message, model="gpt-3.5-turbo"):
    try:
        api_key = get_api_key(model)
        if not api_key:
            raise ValueError(f"API key not found for model: {model}")

        response = completion(
            model=model,
            messages=[{"role": "user", "content": message}],
            api_key=api_key
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return None

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 2:
        print(generate_ai_response(sys.argv[1], sys.argv[2]))
    elif len(sys.argv) > 1:
        print(generate_ai_response(sys.argv[1]))
    else:
        print("Please provide a message as a command-line argument.")
