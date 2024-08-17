# AI Starter Stack 🚀

![Agentic6 Team Logo](/public/logo.png)

[![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)](https://semver.org)
[![Next.js](https://img.shields.io/badge/Next.js-13.x-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38b2ac)](https://tailwindcss.com/)

AI Starter Stack is a powerful, easy-to-use chat application built with Next.js, React, and integrated with OpenAI's GPT models. It provides a seamless way to interact with AI models and explore the possibilities of conversational AI.

## Table of Contents 📚

1. [Quick Start](#quick-start)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Troubleshooting](#troubleshooting)
7. [API Reference](#api-reference)
8. [Project Structure](#project-structure)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)
12. [Acknowledgements](#acknowledgements)
13. [Community and Support](#community-and-support)
14. [Changelog](#changelog)

## Quick Start 🏃‍♂️

```bash
git clone https://github.com/wordopera/my-ai-app.git
cd my-ai-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start chatting!

## Features ✨

- Chat interface for interacting with AI models
- Support for OpenAI GPT models:
  - GPT-3.5-turbo
  - GPT-4
- Message history stored in Supabase
- Responsive design for mobile and desktop
- Dark mode support

## Prerequisites 📋

- Node.js (v14 or later)
- npm or yarn
- Supabase account
- OpenAI API key

## Installation 🛠️

1. Clone the repository:
   ```bash
   git clone https://github.com/wordopera/my-ai-app.git
   cd my-ai-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Configuration](#configuration) section).

4. Start the development server:
   ```bash
   npm run dev
   ```

## Configuration ⚙️

Create a `.env.local` file in the root directory with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (found in Supabase dashboard)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project's anon key (found in Supabase dashboard)
- `OPENAI_API_KEY`: Your OpenAI API key (get it from [OpenAI's website](https://openai.com/))

## Troubleshooting 🔧

1. **Module not found errors**
   - Run `npm install` again
   - Check import statement paths

2. **Development server fails to start**
   - Ensure port 3000 is free
   - Verify `.env.local` configuration

3. **TypeScript errors**
   - Run `npm run type-check`
   - Check `tsconfig.json` configuration

4. **Tailwind styles not applying**
   - Verify `globals.css` import in `_app.tsx`
   - Check `tailwind.config.ts` paths

For more issues, check the browser console or verify Node.js and npm versions.

## API Reference 📘

Main endpoint for generating AI responses:

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

Response: Streaming response with AI-generated text

## Project Structure 🗂️

```
my-ai-app/
├── .git/
├── .next/
├── app/
│   ├── api/
│   │   └── generate-response/
│   │       └── route.ts
│   ├── components/
│   │   ├── ChatBubble.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingIndicator.tsx
│   │   └── ModelSelector.tsx
│   ├── error/
│   │   └── not-found.tsx
│   ├── hooks/
│   │   └── useDarkMode.ts
│   ├── privacy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── showcase/
│   │   ├── page.tsx
│   │   ├── ai-starter-stack/
│   │   │   └── page.tsx
│   │   ├── custom-gpt/
│   │   │   └── page.tsx
│   │   └── audio-to-text/
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── node_modules/
├── public/
│   ├── logo.png
│   ├── og-image.png
│   └── twitter-image.png
├── .env.example
├── .env.local
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Deployment 🚢

This project is designed to be deployed on Vercel:

1. Push your code to a GitHub repository
2. Create a new project on Vercel and link it to your GitHub repo
3. Add environment variables in Vercel dashboard
4. Deploy!

## Contributing 🤝

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to get started.

## License 📄

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements 👏

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [OpenAI](https://openai.com/)

## Community and Support 💬

- Twitter: [Stephen Wise (@Agentic6) / X](https://twitter.com/Agentic6)
- YouTube: [Agentic6 Channel](https://www.youtube.com/@agentic6)
- GitHub Issues: [Project Issues](https://github.com/wordopera/my-ai-app/issues)

## Changelog 📝

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

Happy coding with your AI Starter Stack! 🎉

Internal, Confidential
Stephen Wise, August 15, 2024
