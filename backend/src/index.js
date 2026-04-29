require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const personas = require("./personas");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173', // fill with your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());


const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3001", 
    "X-Title": "Scaler Chatbot", 
  }
});


app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Scaler Chatbot Backend is running" });
});

app.get("/api/personas", (req, res) => {
  const meta = Object.values(personas).map(
    ({ id, name, title, avatar, color, chips }) => ({
      id, name, title, avatar, color, chips,
    }),
  );
  res.json(meta);
});


app.post("/api/chat", async (req, res) => {
  const { personaId, messages } = req.body;


  if (!personaId || !messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "personaId and messages array are required." });
  }

  const persona = personas[personaId];
  if (!persona) {
    return res.status(404).json({ error: `Persona '${personaId}' not found.` });
  }

  try {
    const formattedMessages = [
      { role: "system", content: persona.systemPrompt },
      ...messages.map(msg => ({
        role: msg.role, 
        content: msg.content
      }))
    ];

    const response = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-nano-30b-a3b:free",
      messages: formattedMessages,
    });

    const responseText = response.choices[0].message.content;

    res.json({ reply: responseText, persona: persona.name });

  } catch (err) {
    console.error("OpenRouter API error:", err);

    if (err.status === 401) {
      return res.status(401).json({ error: "Invalid OpenRouter API key." });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded or insufficient credits." });
    }

    res.status(500).json({
      error: "The AI model is temporarily unavailable. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Scaler Chatbot backend running on http://localhost:${PORT}`);
  console.log(`   OpenRouter Key: ${process.env.OPENROUTER_API_KEY ? "✓ Set" : "✗ MISSING"}`);
});