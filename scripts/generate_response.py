import os
from dotenv import load_dotenv
from litellm import completion

load_dotenv()

def generate_ai_response(message):
    try:
        response = completion(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": message}],
            api_key=os.environ.get("PYTHON_OPENAI_API_KEY")
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error generating AI response: {e}")
        return None

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        print(generate_ai_response(sys.argv[1]))
    else:
        print("Please provide a message as a command-line argument.")
