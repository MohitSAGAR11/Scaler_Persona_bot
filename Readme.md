# Scaler Persona AI Chatbot

> Chat with Scaler's founders and Head of Instructors — Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra — powered by Google Gemini.

**Live Demo:** [your-deployed-url-here]  
**Assignment:** Prompt Engineering | Scaler Academy

---

## Screenshots

> _Add screenshots of the running app here_

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
| AI       | Google Gemini 1.5 Flash     |
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

The frontend runs on **http://localhost:3000**

---

## Deployment

### Backend (Railway / Render)
1. Push the `backend/` folder (or the full repo) to GitHub
2. Create a new service on Railway or Render pointing to `backend/`
3. Set environment variable: `GEMINI_API_KEY=your_key`
4. Deploy — note the public URL (e.g., `https://scaler-chatbot-backend.up.railway.app`)

### Frontend (Vercel / Netlify)
1. Create a new project pointing to `frontend/`
2. Set environment variable: `REACT_APP_API_URL=https://your-backend-url`
3. Deploy — the app is live

---

## Environment Variables

### Backend `.env`
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:3001
```

> ⚠️ **Never commit `.env` files.** Only `.env.example` files are in the repo.

---

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