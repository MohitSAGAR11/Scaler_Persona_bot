# Scaler Persona AI Chatbot

> Chat with Scaler's founders and Head of Instructors — Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra — powered by OpenRouter.

**Live Demo:** [your-deployed-url-here]  
**Assignment:** Prompt Engineering | Scaler Academy

---

## Features

- 🎭 **3 Distinct Personas** — Anshuman Singh, Abhimanyu Saxena, Kshitij Mishra
- 💬 **Real Conversations** — Each persona has a deeply researched system prompt
- 🔄 **Persona Switching** — Tabs reset conversation for a clean start
- 💡 **Suggestion Chips** — Quick-start questions per persona
- ⌨️ **Typing Indicator** — Animated indicator while AI responds
- 📱 **Mobile Responsive** — Full sidebar + chat works on all screen sizes
- 🛡️ **Error Handling** — Graceful error messages, never crashes

---

## Tech Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React 18, CSS custom props  |
| Backend  | Node.js, Express            |
| AI       | OpenRouter Models    |
| Fonts    | Syne, JetBrains Mono, Inter |

---

## Project Structure

```
scaler-chatbot/
├── backend/
│   ├── src/
│   │   ├── index.js        # Express server + API routes
│   │   └── personas.js     # All three system prompts
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js          # Root component + state
│   │   ├── components/
│   │   │   ├── PersonaSidebar.js/.css
│   │   │   ├── ChatWindow.js/.css
│   │   │   └── TypingIndicator.js/.css
│   │   └── index.css
│   ├── public/index.html
│   ├── .env.example
│   └── package.json
├── prompts.md              # All system prompts + annotations
├── reflection.md           # 300–500 word reflection
└── README.md
```

---

## Setup & Running Locally

### Prerequisites
- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/scaler-chatbot.git
cd scaler-chatbot
```

### 2. Set up the backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm install
npm run dev
```

The backend runs on **http://localhost:3001**

### 3. Set up the frontend

```bash
cd ../frontend
cp .env.example .env
# REACT_APP_API_URL=http://localhost:3001 (already set)
npm install
npm start
```


## API Endpoints

| Method | Endpoint        | Description                   |
|--------|-----------------|-------------------------------|
| GET    | `/health`       | Server health check           |
| GET    | `/api/personas` | Get persona metadata          |
| POST   | `/api/chat`     | Send a message to a persona   |

### POST `/api/chat`

```json
// Request
{
  "personaId": "anshuman",
  "messages": [
    { "role": "user", "content": "How should I prepare for system design?" }
  ]
}

// Response
{
  "reply": "System design prep starts with...",
  "persona": "Anshuman Singh"
}
```