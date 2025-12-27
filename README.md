# VoxAI - AI-Powered Virtual Assistant 🤖
<p align="center">
  <a href="https://voxai-project.vercel.app/">
    <img src="public/Designer(2).png" alt="Deployed on Vercel" width="200" height="200">
  </a>
</p>

## 🌟 Overview

VoxAI is a next-generation virtual assistant that lives in your browser. Unlike traditional cloud-based assistants, VoxAI prioritizes **Privacy** and **Local Intelligence**. It features a unique "Smart Message Indexer" that turns your conversation history into a semantic search engine—your personal "Second Brain"—without ever sending your data to a server.

Built with React 18 and Vite, it delivers a cinematic, 60fps experience with premium glassmorphism aesthetics.

## ✨ Key Features

### 🧠 Smart Message Indexer

- **Instant Recall**: Search your entire chat history by *concept*, not just keywords.
- **On-Device Vector Database**: Converts messages into semantic vector embeddings stored locally (IndexDB).
- **Zero Privacy Compromise**: Your "Second Brain" lives on your device.

### 🎨 Cinematic Experience

- **Hollywood-Style Splash Screen**: Immersive "System Startup" animation sequence on load.
- **Glassmorphism UI**: Premium, translucent design system with dynamic gradients and blur effects.
- **Voice Visualizer**: Real-time audio waveform visualization during speech interaction.

### 🗣️ Hybrid Voice Engine

- **Browser Synthesis**: Instant, unlimited local TTS support.
- **ElevenLabs Integration (Coming Soon)**: Upcoming support for ultra-realistic premium AI voices.
- **Hands-Free Mode**: "Auto-Submit" voice commands for fluid conversation.

### 🔒 Privacy-First Architecture

- **Local Storage**: All conversations, settings, and vector indices are stored in the browser.
- **Transparent Policy**: Dedicated Privacy Policy page explaining exactly how data is handled.
- **Data Sovereignty**: You own your data. Clear it instantly with one click.

### 🛠️ Productivity Tools

- **Rich Markdown**: Code blocks (with syntax highlighting), tables, and formatted text.
- **Real-time Weather**: Integrated Open-Meteo API for instant global weather reports.
- **Context-Aware**: Remembers conversation context for natural multi-turn dialogue.

## 🛠️ Tech Stack

- **Frontend Core**: React 18, Vite
- **State Management**: Zustand (for high-performance global state)
- **AI Intelligence**: Google Gemini API (Multimodal LLM)
- **Styling & Animation**: Tailwind CSS, Framer Motion
- **Voice & Audio**: Web Speech API, ElevenLabs API (Planned)
- **Data & Storage**: LocalStorage, IndexDB (Vector Store)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Google Gemini API Key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SouravPaitandy/voxai-virtual-ai-assistant.git
   ```

2. Navigate to the directory:

   ```bash
   cd voxai-virtual-ai-assistant
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file:

   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 📞 Contact

- [Portfolio Website](https://www.souravpaitandy.me)
- [Twitter](https://x.com/PaitandySourav)
- [LinkedIn](https://linkedin.com/in/sourav-paitandy)

---
<p align="center">
  Built with ❤️ by <a href="https://www.souravpaitandy.me">Sourav Paitandy</a>
</p>
