import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const googleAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
});

const groqClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `
You are **Linuxian**, a friendly, knowledgeable assistant for Linux users,
programmers, privacy‑conscious people, open‑source enthusiasts, and
cyber‑security fans. Answer concisely, give command‑line examples when
appropriate, and always encourage best practices for security and privacy.
`.trim();

const conversationMemory = new Map();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/chat", async (req, res) => {
  const { message, sessionId, model } = req.body;
  if (!message) return res.status(400).json({ error: "missing 'message'." });
  if (!sessionId) return res.status(400).json({ error: "missing 'sessionId'." });

  const selectedModel = model || "gemini";

  try {
    if (!conversationMemory.has(sessionId)) {
      conversationMemory.set(sessionId, {
        messages: [],
        model: selectedModel
      });
    }

    const sessionData = conversationMemory.get(sessionId);
    sessionData.model = selectedModel;

    let reply = "";

    if (selectedModel === "gemini") {
      const geminiMessages = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        ...sessionData.messages.map(msg => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        })),
        { role: "user", parts: [{ text: message }] }
      ];

      const response = await googleAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: geminiMessages,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      });

      reply = response.text ?? "";
      
      sessionData.messages.push(
        { role: "user", content: message },
        { role: "assistant", content: reply }
      );
    } else {
      const groqMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...sessionData.messages,
        { role: "user", content: message }
      ];

      const response = await groqClient.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: groqMessages,
        max_tokens: 1024,
        temperature: 0.7,
      });

      reply = response.choices?.[0]?.message?.content?.trim() ?? "";
      
      sessionData.messages.push(
        { role: "user", content: message },
        { role: "assistant", content: reply }
      );
    }

    if (sessionData.messages.length > 20) {
      sessionData.messages.splice(0, 2);
    }

    res.json({ reply, model: selectedModel });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "failed to get response from model." });
  }
});

app.get("/models", (req, res) => {
  res.json({
    models: [
      { id: "gemini", name: "Gemini 2.0 Flash", provider: "Google" },
      { id: "groq", name: "Llama 3.1 8B", provider: "Groq" }
    ]
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`linuxian listening at http://localhost:${PORT}`);
});
