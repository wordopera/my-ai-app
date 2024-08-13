# AI Starter Stack: Comprehensive Installation Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Cloning the Repository](#cloning-the-repository)
3. [Environment Setup](#environment-setup)
   - [Node.js Setup](#nodejs-setup)
   - [Python Setup](#python-setup)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Additional Resources](#additional-resources)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Git (version 2.30.0 or later)
- Node.js (version 14.0.0 or later)
- npm (usually comes with Node.js)
- Python (version 3.8 or later)
- pip (usually comes with Python)

To verify your installations, open a terminal and run:

```bash
git --version
node --version
npm --version
python --version
pip --version
```

If any of these commands fail, please install the missing software before proceeding.

## Cloning the Repository

1. Open your terminal (Command Prompt or PowerShell on Windows, Terminal on macOS/Linux).

2. Navigate to the directory where you want to clone the repository:

   ```bash
   cd /path/projects/folder
   ```

3. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-starter-stack.git
   ```

   Replace `your-username` with the actual GitHub username or organization name where the repository is hosted.

4. Navigate into the cloned repository:

   ```bash
   cd ai-starter-stack
   ```

## Environment Setup

### Node.js Setup

1. Install the required Node.js dependencies:

   ```bash
   npm install
   ```

   This command will install all dependencies listed in the `package.json` file.

2. Install development dependencies:

   ```bash
   npm install --save-dev @types/node @types/react @types/react-dom ts-node @types/lru-cache
   ```

### Python Setup

1. Create a virtual environment:

   - On macOS/Linux:
     ```bash
     python3 -m venv venv
     ```
   - On Windows:
     ```bash
     python -m venv venv
     ```

2. Activate the virtual environment:

   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows (Command Prompt):
     ```bash
     venv\Scripts\activate.bat
     ```
   - On Windows (PowerShell):
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Configuration

1. Create a `.env` file in the root directory of the project:

   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file in a text editor and fill in the required environment variables:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   SUPABASE_URL=your_supabase_project_url_here
   SUPABASE_KEY=your_supabase_project_api_key_here
   ```

   Replace the placeholders with your actual API keys and URLs.

## Running the Application

1. Ensure you're in the project root directory and your virtual environment is activated.

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your web browser and navigate to `http://localhost:3000`. You should see the AI Starter Stack application running.

## Troubleshooting

If you encounter any issues during the installation or running of the application, try the following:

1. Ensure all prerequisites are correctly installed and up to date.
2. Delete the `node_modules` folder and `package-lock.json` file, then run `npm install` again.
3. Ensure your `.env` file is correctly configured with valid API keys.
4. Check the console output for any error messages and search for them online or in the project's issue tracker.

If problems persist, please open an issue on the GitHub repository with details about the error and your environment.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [OpenAI API Documentation](https://beta.openai.com/docs/)
- [LiteLLM Documentation](https://github.com/BerriAI/litellm)

For more detailed information about the AI Starter Stack, please refer to the project's README.md file and any additional documentation in the `docs/` directory of the repository.
