# Linuxian

A website for Linux users, programmers, and open-source enthusiasts. Provides AI-powered assistance through multiple language models with a focus on Linux, security, and privacy topics.

## Features

- Dual AI model support (Google Gemini 2.0 Flash and Groq's Llama 3.1 8B)
- Conversation memory with session management
- Markdown rendering for code blocks and formatted responses
- Responsive design for desktop and mobile
- Pre-defined suggestion cards for common Linux topics
- Real-time typing indicators
- I don't know dude

## Website

[linuxian.vercel.app](https://linuxian.vercel.app)

## Models

- **Gemini 2.0 Flash** (Google) - Default model
- **Llama 3.1 8B** (Groq) - Alternative model

## Technical Details

The website is built with Express.js backend and vanilla JavaScript frontend. It uses the Google Generative AI and Groq APIs for AI model integration.

The system is configured with a specialized prompt for "Linuxian" - an assistant focused on Linux, programming, security, and open-source topics. Conversations maintain context within sessions and automatically trim to the last 20 messages.

## License

[MIT License](LICENSE)
