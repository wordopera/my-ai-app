# AI Starter Stack: Comprehensive Installation Guide for Windows 11 and Visual Studio Code

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up Visual Studio Code](#setting-up-visual-studio-code)
3. [Creating the Project Structure](#creating-the-project-structure)
4. [Environment Setup](#environment-setup)
   - [Node.js Setup](#nodejs-setup)
   - [Python Setup](#python-setup)
5. [Configuration](#configuration)
6. [Creating and Editing Key Project Files](#creating-and-editing-key-project-files)
7. [Setting Up Tailwind CSS](#setting-up-tailwind-css)
8. [Running the Application](#running-the-application)
9. [Using VS Code Features](#using-vs-code-features)
10. [Troubleshooting](#troubleshooting)
11. [Additional Resources](#additional-resources)
12. [Issue Log](#issue-log)
13. [Changelog](#changelog)

## Prerequisites

Before you begin, ensure you have the following installed on your Windows 11 system:

- Windows 11 (version 21H2 or later)
- An internet connection

We'll guide you through installing the rest of the necessary software.

## Setting Up Visual Studio Code

1. Download Visual Studio Code from the official website: https://code.visualstudio.com/

2. Run the installer and follow the installation wizard. Use the default settings unless you have specific preferences.

3. Once installed, open Visual Studio Code.

4. Install the following extensions by clicking on the Extensions icon in the left sidebar (it looks like four squares) and searching for each:
   - ESLint
   - Prettier - Code formatter
   - Python
   - TypeScript and JavaScript Language Features (usually pre-installed)
   - Tailwind CSS IntelliSense

5. (Optional but recommended) Install Windows Terminal from the Microsoft Store for a better command-line experience.

## Creating the Project Structure

1. Open Visual Studio Code.

2. Click on "File" > "Open Folder" and create a new folder named "ai-starter-stack" in your desired location.

3. In VS Code's Explorer (left sidebar), right-click in the empty space and select "New File". Create the following files:
   - `package.json`
   - `next.config.js`
   - `tsconfig.json`
   - `.env`
   - `requirements.txt`

4. Create the following folders by right-clicking in the Explorer and selecting "New Folder":
   - `pages`
   - `styles`
   - `components`
   - `lib`

## Environment Setup

### Node.js Setup

1. Download Node.js (which includes npm) from https://nodejs.org/ (choose the LTS version).

2. Run the installer and follow the installation wizard. Use the default settings.

3. Open a new VS Code integrated terminal (Terminal > New Terminal) and verify the installation:

   ```bash
   node --version
   npm --version
   ```

4. In the VS Code integrated terminal, navigate to your project folder and run:

   ```bash
   npm init -y
   ```

5. Install project dependencies:

   ```bash
   npm install next react react-dom @supabase/supabase-js openai
   ```

6. Install development dependencies:

   ```bash
   npm install --save-dev typescript @types/react @types/node eslint prettier eslint-config-next
   ```

### Python Setup

1. Download Python from https://www.python.org/downloads/ (choose the latest version).

2. Run the installer. Make sure to check "Add Python to PATH" before installing.

3. Open a new VS Code integrated terminal and verify the installation:

   ```bash
   python --version
   pip --version
   ```

4. Create a virtual environment:

   ```bash
   python -m venv venv
   ```

5. Activate the virtual environment:

   ```bash
   .\venv\Scripts\Activate.ps1
   ```

   If you encounter an error about execution policies, run PowerShell as administrator and execute:

   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

6. Install Python dependencies:

   ```bash
   pip install litellm supabase
   ```

7. Generate a `requirements.txt` file:

   ```bash
   pip freeze > requirements.txt
   ```

## Configuration

1. Open the `.env` file in VS Code and add the following content:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

   Replace the placeholders with your actual API keys and URLs.

2. To obtain these keys:
   - For OpenAI: Sign up at https://openai.com/ and create an API key in your account dashboard.
   - For Supabase: Create a new project at https://supabase.com/ and find your project URL and anon key in the project settings.

## Creating and Editing Key Project Files

1. Open `next.config.js` and add the following content:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
   }

   module.exports = nextConfig
   ```

2. Open `tsconfig.json` and add the following content:

   ```json
   {
     "compilerOptions": {
       "target": "es5",
       "lib": ["dom", "dom.iterable", "esnext"],
       "allowJs": true,
       "skipLibCheck": true,
       "strict": true,
       "forceConsistentCasingInFileNames": true,
       "noEmit": true,
       "esModuleInterop": true,
       "module": "esnext",
       "moduleResolution": "node",
       "resolveJsonModule": true,
       "isolatedModules": true,
       "jsx": "preserve",
       "incremental": true
     },
     "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
     "exclude": ["node_modules"]
   }
   ```

3. Create a new file `pages/_app.tsx` with the following content:

   ```typescript
   import '../styles/globals.css'
   import type { AppProps } from 'next/app'

   function MyApp({ Component, pageProps }: AppProps) {
     return <Component {...pageProps} />
   }

   export default MyApp
   ```

4. Create a new file `pages/index.tsx` with a basic component:

   ```typescript
   import type { NextPage } from 'next'

   const Home: NextPage = () => {
     return (
       <div>
         <h1>Welcome to AI Starter Stack</h1>
       </div>
     )
   }

   export default Home
   ```

## Setting Up Tailwind CSS

1. Install Tailwind CSS and its dependencies:

   ```bash
   npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
   ```

2. Generate Tailwind config files:

   ```bash
   npx tailwindcss init -p
   ```

3. Open `tailwind.config.js` and update its content:

   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./pages/**/*.{js,ts,jsx,tsx}",
       "./components/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. Create a new file `styles/globals.css` and add the following content:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## Running the Application

1. In the VS Code integrated terminal, make sure you're in the project root directory.

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your web browser and navigate to `http://localhost:3000`. You should see the "Welcome to AI Starter Stack" message.

## Using VS Code Features

1. Source Control:
   - Click on the Source Control icon in the left sidebar (branch icon).
   - Click on "Initialize Repository" to start using Git.
   - Stage changes by clicking the "+" next to modified files.
   - Commit changes by entering a commit message and clicking the checkmark.

2. Debugging:
   - Click on the Run and Debug icon in the left sidebar (play button with a bug).
   - Click on "create a launch.json file" and select "Next.js" from the dropdown.
   - To start debugging, click the green play button or press F5.

3. Integrated Terminal:
   - Access the terminal anytime by pressing Ctrl+` or going to View > Terminal.

4. IntelliSense and Auto-completion:
   - As you type, VS Code will provide suggestions. Use Tab or Enter to accept suggestions.

5. Formatting:
   - To format a file, right-click in the editor and select "Format Document" or use the shortcut Shift+Alt+F.

## Troubleshooting

1. If you encounter module not found errors:
   - Ensure all dependencies are installed by running `npm install` again.
   - Check that file paths in import statements are correct.

2. If the development server fails to start:
   - Check that the port 3000 is not in use by another application.
   - Ensure your `.env` file is correctly configured.

3. If TypeScript errors occur:
   - Run `npm run type-check` to see detailed error messages.
   - Ensure your `tsconfig.json` is correctly configured.

4. If Tailwind styles are not applying:
   - Check that `globals.css` is imported in `_app.tsx`.
   - Verify that the `tailwind.config.js` file includes the correct paths.

5. For any other issues:
   - Check the console in your browser's developer tools for error messages.
   - Verify that you're using compatible versions of Node.js and npm.

## Additional Resources

- Next.js Documentation: https://nextjs.org/docs
- React Documentation: https://reactjs.org/docs/getting-started.html
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Supabase Documentation: https://supabase.com/docs
- OpenAI API Documentation: https://platform.openai.com/docs/
- VS Code Documentation: https://code.visualstudio.com/docs

Remember to regularly save your work and commit changes to version control. Happy coding with your AI Starter Stack!

## Issue Log

| Date | Description | Comments | Status |
|------|-------------|----------|--------|
| Aug 10, 2024 | Python not working on Vercel deployment | 10Aug24 - More research needed. Change code from Python to Javascript for generating response. | Closed |

## Changelog

### Version 1.0.0 (August 8, 2024)
- Initial release of the comprehensive installation guide
- Tailored instructions for Windows 11 and Visual Studio Code
- Step-by-step guidance for setting up the AI Starter Stack from scratch

---

Last Updated: August 8, 2024

Internal, Confidential
Stephen Wise, August 8, 2024
