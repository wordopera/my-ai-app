# AI Starter Stack

## Project: Agentic6's HomePage Site
Owner: Agentic6
Date: August 15, 2024

This project is an AI Chat Application built with Next.js, React, and integrated with various AI models through API calls.

## Table of Contents
1. [Features](#features)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)
8. [API Reference](#api-reference)
9. [Database Schema](#database-schema)
10. [Deployment](#deployment)
11. [Project Structure](#project-structure)
12. [File Structure](#file-structure)
13. [Contributing](#contributing)
14. [Testing](#testing)
15. [Troubleshooting](#troubleshooting)
16. [FAQ](#faq)
17. [License](#license)
18. [Acknowledgements](#acknowledgements)
19. [Contact Information](#contact-information)
20. [Changelog](#changelog)

## Features

- Chat interface for interacting with AI models
- Support for multiple AI models:
  - OpenAI (GPT-3.5, GPT-4)
  - Anthropic (Claude)
  - Meta AI (Llama)
  - Google AI (Gemini)
- Message history stored in Supabase

## Architecture

![AI Starter Stack Architecture](./public/architecture-diagram.svg)

This diagram illustrates the main components of the AI Starter Stack and their interactions:
- Client Browser: The user interface
- Next.js Frontend: React-based frontend
- Next.js API Routes: Backend API handling AI model interactions
- Supabase: Database for storing chat messages
- AI Services: Integrated AI APIs (OpenAI, Anthropic, Llama, Google Vertex AI)

## Tech Stack

- Frontend: Next.js, React
- Backend: Next.js API Routes
- Database: Supabase
- AI Integration: OpenAI, Anthropic, Meta AI (Llama), Google Cloud (Vertex AI)
- Styling: Tailwind CSS
- State Management: React Hooks
- Deployment: Vercel

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account
- API keys for OpenAI, Anthropic, Meta AI (Llama), and Google Cloud
- Google Cloud service account key file

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/wordopera/my-ai-app.git
   cd my-ai-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. Copy `.env.example` to `.env.local`:
   ```
   cp .env.example .env.local
   ```

2. Update the `.env.local` file with your API keys and configuration:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   LLAMA_API_KEY=your_llama_api_key
   GOOGLE_APPLICATION_CREDENTIALS=path_to_your_service_account_key_file.json
   GOOGLE_CLOUD_PROJECT=your_google_cloud_project_id
   GOOGLE_CLOUD_LOCATION=your_google_cloud_location
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Select an AI model from the dropdown menu.

4. Type your message in the input field and click "Send" or press Enter.

5. View the AI's response in the chat window.

## API Reference

The main API endpoint for generating AI responses is:

```
POST /api/generate-response
```

Request body:
```json
{
  "message": "Your message here",
  "model": "gpt-3.5-turbo"
}
```

Response:
- Status 200: Streaming response with AI-generated text
- Status 400: Bad request (missing message or model)
- Status 500: Server error

## Database Schema

The Supabase database includes a `messages` table with the following structure:

| Column      | Type      | Description                 |
|-------------|-----------|-----------------------------|
| id          | uuid      | Primary key                 |
| created_at  | timestamp | Timestamp of message        |
| content     | text      | User's message              |
| ai_response | text      | AI's response               |

## Deployment

This project is designed to be deployed on Vercel. Follow these steps:

1. Push your code to a GitHub repository.
2. Create a new project on Vercel and link it to your GitHub repository.
3. In the Vercel dashboard, add all the environment variables from your `.env.local` file.
4. Deploy the project.

## Project Structure

Key application files and directories:

- `/app`: Next.js app directory
  - `/api`: API routes
    - `/generate-response/route.ts`: AI response generation endpoint
  - `/components`: React components
    - `Header.tsx`: Header component
    - `Footer.tsx`: Footer component
  - `globals.css`: Global styles
  - `layout.tsx`: Root layout component
  - `page.tsx`: Main chat interface
- `/public`: Static files
  - `architecture-diagram.svg`: Visual representation of the project architecture

## File Structure

Complete project file structure:

```
my-ai-app/
├── .git/
├── .next/
├── app/
│   ├── api/
│   │   └── generate-response/
│   │       └── route.ts
│   ├── components/
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── node_modules/
├── public/
│   └── architecture-diagram.svg
├── .env.example
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Testing

To run tests:

```
npm run test
```

(Note: Actual test commands may vary based on the testing framework used)

## Troubleshooting

Common issues and solutions will be added here as they are identified.

## FAQ

Frequently asked questions will be added here as they arise.

## License

This project is licensed under the ISC License.

## Acknowledgements

- Next.js
- React
- Tailwind CSS
- Supabase
- OpenAI
- Anthropic
- Meta AI
- Google Cloud

## Contact Information

For questions or feedback, please contact us at [contact email].

## Changelog

### Version 0.1.0
- Initial release

---
Internal, Confidential
Agentic6, August 15, 2024
