import { useState, useRef, useEffect } from 'react'
import './App.css'

export default function App() {
  const [activeView, setActiveView] = useState('new-conversation')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! 👋 Soy tu Asistente Virtual. ¿En qué puedo ayudarte hoy?',
      time: getCurrentTime()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const nextMessageId = useRef(2)
  const messagesEndRef = useRef(null)

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = (customText) => {
    const textToSend = (typeof customText === 'string' ? customText : input).trim()
    if (!textToSend) return

    const userMessage = {
      id: nextMessageId.current++,
      sender: 'user',
      text: textToSend,
      time: getCurrentTime()
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Simulación visual de respuesta del bot
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const mockResponses = [
        '¡Entendido! Esta es una vista previa puramente visual de la interfaz.',
        'He recibido tu mensaje correctamente en la interfaz.',
        'Perfecto. Cuando conectes el backend o API del chatbot, aquí aparecerán las respuestas reales.',
        'Mensaje registrado en pantalla. Puedes seguir probando el chat visualmente.'
      ]
      const randomReply = mockResponses[Math.floor(Math.random() * mockResponses.length)]

      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId.current++,
          sender: 'bot',
          text: randomReply,
          time: getCurrentTime()
        }
      ])
    }, 700)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClear = () => {
    setMessages([
      {
        id: nextMessageId.current++,
        sender: 'bot',
        text: 'Conversación reiniciada. ¿En qué puedo ayudarte?',
        time: getCurrentTime()
      }
    ])
  }

  const handleNewConversation = () => {
    setActiveView('new-conversation')
    setMessages([
      {
        id: nextMessageId.current++,
        sender: 'bot',
        text: '¡Hola! 👋 Soy tu Asistente Virtual. ¿En qué puedo ayudarte hoy?',
        time: getCurrentTime()
      }
    ])
  }

  const quickPrompts = [
    '📄 Consultar factura',
    ' Un prompt acá bien insano'
  ]

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark" aria-hidden="true">B</span>
          <div>
            <strong>Banamex</strong>
            <span>Asistente Virtual</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          <p className="sidebar-label">MENÚ</p>
          <button
            type="button"
            className={`sidebar-link ${activeView === 'account' ? 'active' : ''}`}
            onClick={() => setActiveView('account')}
            aria-current={activeView === 'account' ? 'page' : undefined}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>
            <span>Mi cuenta</span>
          </button>
          <button
            type="button"
            className={`sidebar-link ${activeView === 'history' ? 'active' : ''}`}
            onClick={() => setActiveView('history')}
            aria-current={activeView === 'history' ? 'page' : undefined}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
              <path d="M3 3v5h5M12 7v5l3 2" />
            </svg>
            <span>Conversaciones previas</span>
          </button>
          <button
            type="button"
            className={`sidebar-link ${activeView === 'new-conversation' ? 'active' : ''}`}
            onClick={handleNewConversation}
            aria-current={activeView === 'new-conversation' ? 'page' : undefined}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Nueva conversación</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-status-dot" />
          <span>Asistente virtual en línea</span>
        </div>
      </aside>

      {activeView === 'new-conversation' ? (
        <div className="chat-app">
          <header className="chat-header">
            <div className="chat-header-info">
              <div className="bot-avatar">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
                <span className="status-dot"></span>
              </div>
              <div>
                <h1 className="chat-title">Asistente Virtual</h1>
                <p className="chat-status">En línea • Banamex</p>
              </div>
            </div>

            <button className="clear-btn" onClick={handleClear} title="Limpiar conversación">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              <span>Limpiar</span>
            </button>
          </header>

          <main className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                {msg.sender === 'bot' && <div className="bubble-avatar">🤖</div>}
                <div className="message-bubble-wrapper">
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                  </div>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-row bot">
                <div className="bubble-avatar">🤖</div>
                <div className="message-bubble-wrapper">
                  <div className="message-bubble typing-bubble">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </main>

          <div className="quick-prompts">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                className="prompt-chip"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          <footer className="chat-input-area">
            <form
              className="chat-form"
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
            >
              <input
                type="text"
                className="chat-input"
                placeholder="Escribe un mensaje aquí..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <button
                type="submit"
                className="send-btn"
                disabled={!input.trim()}
                title="Enviar mensaje"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </footer>
        </div>
      ) : (
        <main className="placeholder-view">
          <div className="placeholder-icon" aria-hidden="true">
            {activeView === 'account' ? '◉' : '◷'}
          </div>
          <h1>{activeView === 'account' ? 'Mi cuenta' : 'Conversaciones previas'}</h1>
          <p>
            {activeView === 'account'
              ? 'La información de tu cuenta estará disponible aquí próximamente.'
              : 'Tus conversaciones guardadas aparecerán aquí próximamente.'}
          </p>
          <button
            type="button"
            className="return-chat-btn"
            onClick={handleNewConversation}
          >
            Ir a nueva conversación
          </button>
        </main>
      )}
    </div>
  )
}
