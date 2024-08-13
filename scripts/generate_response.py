import os
from dotenv import load_dotenv
from litellm import completion
from typing import Optional

# Load environment variables from .env file
load_dotenv()

def get_api_key(model: str) -> Optional[str]:
    """Get API key based on the model type."""
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

def generate_ai_response(message: str, model: str = "gpt-3.5-turbo") -> Optional[str]:
    """Generate AI response based on the message and model."""
    try:
        api_key = get_api_key(model)
        if not api_key:
            raise ValueError(f"API key not found for model: {model}")

        response = completion(
            model=model,
            messages=[{"role": "user", "content": message}],
            api_key=api_key
        )
        
        if response and response.choices and len(response.choices) > 0:
            return response.choices[0].message.content.strip()
        else:
            print("No valid choices returned from the AI model.")
            return None
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return None

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 2:
        message = sys.argv[1]
        model = sys.argv[2]
        response = generate_ai_response(message, model)
        if response:
            print(response)
        else:
            print("Failed to generate response.")
    elif len(sys.argv) > 1:
        message = sys.argv[1]
        response = generate_ai_response(message)
        if response:
            print(response)
        else:
            print("Failed to generate response.")
    else:
        print("Please provide a message as a command-line argument.")
