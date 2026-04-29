import React from "react";
import "./PersonaSidebar.css";

/**
 * PersonaSidebar Component
 * Displays a list of available personas to chat with.
 */
function PersonaSidebar({ personas, activePersonaId, onSwitch, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">S</div>
        <div className="sidebar-logo-text">
          <span className="sidebar-logo-name">Scaler</span>
          <span className="sidebar-logo-sub">Persona Chat</span>
        </div>
      </div>

      {/* Section label */}
      <div className="sidebar-section-label">CHOOSE PERSONA</div>

      {/* Persona cards */}
      <nav className="sidebar-nav">
        {personas.map((persona) => {
          const isActive = persona.id === activePersonaId;
          return (
            <button
              key={persona.id}
              type="button" // Best practice for buttons that don't submit forms
              className={`persona-card ${isActive ? "persona-card--active" : ""}`}
              onClick={() => onSwitch(persona.id)}
              style={{ "--persona-color": persona.color }}
            >
              <div
                className="persona-avatar"
                style={{ 
                  background: `${persona.color}22`, 
                  color: persona.color 
                }}
              >
                {persona.avatar}
              </div>
              <div className="persona-info">
                <div className="persona-name">{persona.name}</div>
                <div className="persona-title">{persona.title}</div>
              </div>
              {isActive && <div className="persona-active-dot" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-footer-text">
          Built for Scaler Academy<br />
          Prompt Engineering Assignment
        </div>
      </div>
    </aside>
  );
}

export default PersonaSidebar;