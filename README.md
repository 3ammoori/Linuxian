# Linuxian

A web-based platform designed for Linux users, software developers, and open-source enthusiasts. The application delivers AI-powered assistance through multiple language models, with specialized focus on Linux systems, cybersecurity, and privacy-related topics.

## Features

- Dual AI model architecture (Google Gemini 2.0 Flash and Groq's Llama 3.1 8B)
- Persistent conversation memory with session management
- Markdown rendering support for code blocks and formatted responses
- Responsive design compatible with both desktop and mobile devices
- Pre-configured suggestion cards for common Linux-related queries
- Real-time typing indicators
---
- Note: The current features work well, which is the main thing. My to-do list for new ones is ambitious, but it currently lives in a complex symbiotic relationship with my motivation, free time, and the mysterious forces of procrastination. So, while I fully intend to add more, the schedule is "eventually". In the meantime, what's here is solid and ready to use, yeah.

## Access

The platform is accessible at: [linuxian.vercel.app](https://linuxian.vercel.app)

## Supported Models

- **Gemini 2.0 Flash** (Google) - Primary model
- **Llama 3.1 8B** (Groq) - Secondary model

## Technical Architecture

The application utilizes an Express.js backend with a vanilla JavaScript frontend. Integration with AI services is achieved through the Google Generative AI and Groq APIs.

The system implements a specialized prompt configuration for "Linuxian" - an AI assistant specifically optimized for Linux administration, programming, security protocols, and open-source technologies. Conversation context is maintained within sessions, with automatic trimming to preserve the most recent 20 messages for optimal performance.

## License

This project is distributed under the [MIT License](LICENSE).
