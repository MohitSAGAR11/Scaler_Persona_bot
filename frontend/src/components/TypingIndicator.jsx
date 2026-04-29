import React from "react";
import "./TypingIndicator.css";

/**
 * TypingIndicator Component
 * A simple animated loading state representing the assistant's "thinking" process.
 */
function TypingIndicator({ color = "var(--text-muted)" }) {
  return (
    <div className="typing-indicator" aria-label="Assistant is typing">
      <span style={{ background: color }} />
      <span style={{ background: color }} />
      <span style={{ background: color }} />
    </div>
  );
}

export default TypingIndicator;