import React, { useState, useEffect } from "react";
import "./App.css";


import PersonaSidebar from "./components/PersonaSidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";

const API_URL = import.meta.env.VITE_BACKEND_URL || "";

const PERSONAS_FALLBACK = [
  {
    id: "anshuman",
    name: "Anshuman Singh",
    title: "Co-founder, Scaler | Ex-Facebook Messenger",
    avatar: "AS",
    color: "#E84855",
    chips: [
      "How did Facebook Messenger handle 100M users?",
      "What should I focus on to become a top engineer?",
      "Why did you start Scaler?",
      "How do I reduce latency in my system?",
    ],
  },
  {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    title: "Co-founder, Scaler | Ex-Fab.com (NYC)",
    avatar: "AX",
    color: "#2D6A4F",
    chips: [
      "Tell me about the Online Stanford mission",
      "What did you learn from your NYC startup days?",
      "Is it too late to switch to tech?",
      "How is AI affecting engineering careers?",
    ],
  },
  {
    id: "kshitij",
    name: "Kshitij Mishra",
    title: "Head of Instructors, Scaler | Ex-Lead Engineer",
    avatar: "KM",
    color: "#5E60CE",
    chips: [
      "I'm stuck on Dynamic Programming",
      "How do I stay consistent in my Scaler journey?",
      "What's the difference between a junior and a lead engineer?",
      "How do I crack system design interviews?",
    ],
  },
];

function App() {
  const [personas, setPersonas] = useState(PERSONAS_FALLBACK);
  const [activePersonaId, setActivePersonaId] = useState("anshuman");
  const [conversations, setConversations] = useState({
    anshuman: [],
    abhimanyu: [],
    kshitij: [],
  });
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activePersona = personas.find((p) => p.id === activePersonaId);
  const messages = conversations[activePersonaId] || [];

  useEffect(() => {
    fetch(`${API_URL}/api/personas`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPersonas(data);
      })
      .catch(() => {}); // use fallback
  }, []);

  const handleSwitchPersona = (id) => {
    setActivePersonaId(id);
    setSidebarOpen(false);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: "user", content: text, id: Date.now() };
    const updatedMessages = [...messages, userMsg];

    setConversations((prev) => ({
      ...prev,
      [activePersonaId]: updatedMessages,
    }));
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personaId: activePersonaId,
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const assistantMsg = {
        role: "assistant",
        content: data.reply,
        id: Date.now() + 1,
      };

      setConversations((prev) => ({
        ...prev,
        [activePersonaId]: [...updatedMessages, assistantMsg],
      }));
    } catch (err) {
      const errorMsg = {
        role: "assistant",
        content: `⚠️ ${err.message || "The AI model is temporarily unavailable. Please try again."}`,
        id: Date.now() + 1,
        isError: true,
      };
      setConversations((prev) => ({
        ...prev,
        [activePersonaId]: [...updatedMessages, errorMsg],
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setConversations((prev) => ({ ...prev, [activePersonaId]: [] }));
  };

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <PersonaSidebar
        personas={personas}
        activePersonaId={activePersonaId}
        onSwitch={handleSwitchPersona}
        isOpen={sidebarOpen}
      />

      <ChatWindow
        persona={activePersona}
        messages={messages}
        loading={loading}
        onSend={handleSendMessage}
        onClear={handleClearChat}
        onMenuOpen={() => setSidebarOpen(true)}
      />
    </div>
  );
}

export default App;