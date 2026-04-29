import React, { useRef, useEffect, useState } from "react";
import "./ChatWindow.css";
// Ensure TypingIndicator is also converted to .jsx
import TypingIndicator from "./TypingIndicator.jsx";

/**
 * ChatWindow Component
 * Handles the messaging interface, auto-scrolling, and auto-resizing input.
 */
function ChatWindow({ persona, messages, loading, onSend, onClear, onMenuOpen }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom whenever messages or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput("");
    
    // Reset textarea height after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    // Standard "Enter to Send" logic
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    
    // Auto-resize logic
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const handleChipClick = (chip) => {
    if (loading) return;
    onSend(chip);
  };

  if (!persona) return null;

  const isEmpty = messages.length === 0;

  return (
    <main className="chat-window" style={{ "--persona-color": persona.color }}>
      {/* Header */}
      <header className="chat-header">
        <button className="menu-btn" onClick={onMenuOpen} aria-label="Open menu">
          <span /><span /><span />
        </button>

        <div className="chat-header-persona">
          <div
            className="chat-header-avatar"
            style={{ 
              background: `${persona.color}22`, 
              color: persona.color 
            }}
          >
            {persona.avatar}
          </div>
          <div>
            <div className="chat-header-name">{persona.name}</div>
            <div className="chat-header-title">{persona.title}</div>
          </div>
        </div>

        <div className="chat-header-actions">
          {!isEmpty && (
            <button className="clear-btn" onClick={onClear} title="Clear chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
            </button>
          )}
          <div className="live-badge">
            <span className="live-dot" />
            LIVE
          </div>
        </div>
      </header>

      {/* Messages area */}
      <div className="chat-messages">
        {isEmpty ? (
          <div className="chat-empty">
            <div
              className="chat-empty-avatar"
              style={{ 
                background: `${persona.color}18`, 
                color: persona.color 
              }}
            >
              {persona.avatar}
            </div>
            <h2 className="chat-empty-name">Chat with {persona.name}</h2>
            <p className="chat-empty-desc">{persona.title}</p>

            {/* Suggestion chips */}
            <div className="chip-grid">
              {persona.chips?.map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  className="chip"
                  onClick={() => handleChipClick(chip)}
                  disabled={loading}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-row message-row--${msg.role}`}
              >
                {msg.role === "assistant" && (
                  <div
                    className="message-avatar"
                    style={{ 
                      background: `${persona.color}22`, 
                      color: persona.color 
                    }}
                  >
                    {persona.avatar}
                  </div>
                )}
                <div className={`message-bubble message-bubble--${msg.role} ${msg.isError ? "message-bubble--error" : ""}`}>
                  <div className="message-text">{msg.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-row message-row--assistant">
                <div
                  className="message-avatar"
                  style={{ 
                    background: `${persona.color}22`, 
                    color: persona.color 
                  }}
                >
                  {persona.avatar}
                </div>
                <div className="message-bubble message-bubble--assistant">
                  <TypingIndicator color={persona.color} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <div className="chat-input-area">
        {!isEmpty && (
          <div className="chip-row">
            {persona.chips?.slice(0, 3).map((chip, i) => (
              <button
                key={i}
                type="button"
                className="chip chip--sm"
                onClick={() => handleChipClick(chip)}
                disabled={loading}
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        <div className="input-row">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${persona.name.split(" ")[0]}...`}
            rows={1}
            disabled={loading}
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        <div className="input-hint">Press Enter to send · Shift+Enter for new line</div>
      </div>
    </main>
  );
}

export default ChatWindow;