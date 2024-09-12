# VoxAI Project

## Description
VoxAI is an AI-powered assistant application built with React and Vite. It uses the Gemini API to provide intelligent responses to user queries.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/SouravPaitandy/voxai-virtual-ai-assistant.git
   ```
2. Navigate to the project directory:
   ```
   cd voxai-project
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Configuration
1. Create a `.env` or `.env.local` file in the root directory.
2. Add your Gemini API key:
   ```
   VITE_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY
   ```

## Usage
To run the development server:
```
npm run dev
```

## Deployment
The application is deployed on Vercel. The deployment is handled automatically through Vercel's workflow.

## Contributing
Pull requests are always welcome. For major changes, please open an issue first to discuss what you would like to change.
