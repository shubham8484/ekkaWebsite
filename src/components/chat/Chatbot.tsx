'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  type ChatMessage,
  getBotResponse,
  quickReplies,
  renderMarkdown,
} from '@/lib/chatbot';
import { site } from '@/data/content';

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: `Welcome to ${site.name}! I'm here to answer questions about our creator partnerships, services, and how to work with us.`,
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      const t = window.setTimeout(() => inputRef.current?.focus(), 300);
      return () => window.clearTimeout(t);
    }
  }, [open, messages, typing, scrollToBottom]);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg: ChatMessage = { id: createId(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const delay = 400 + Math.min(trimmed.length * 12, 800);
    window.setTimeout(() => {
      const reply = getBotResponse(trimmed);
      const botMsg: ChatMessage = {
        id: createId(),
        role: 'assistant',
        ...reply,
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, delay);
  }, [typing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chatbot">
      <div
        id={panelId}
        className={`chatbot__panel${open ? ' chatbot__panel--open' : ''}`}
        role="dialog"
        aria-label="Ekka Media chat assistant"
        aria-hidden={!open}
      >
        <header className="chatbot__header">
          <div className="chatbot__header-info">
            <Image
              src="/assets/logo-icon.png"
              alt=""
              width={32}
              height={32}
              className="chatbot__avatar"
              style={{
                filter:
                  'hue-rotate(165deg) saturate(1.65) brightness(1.05) contrast(1.08)',
                borderRadius: 8,
              }}
            />
            <div>
              <p className="chatbot__title">Ekka Assistant</p>
              <p className="chatbot__status">
                <span className="chatbot__status-dot" aria-hidden="true" />
                Online · {site.parent.shortName}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="chatbot__close"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </header>

        <div className="chatbot__messages" ref={listRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chatbot__bubble chatbot__bubble--${msg.role}`}
            >
              <p
                className="chatbot__text"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
              />
              {msg.link && (
                <Link href={msg.link.href} className="chatbot__link" onClick={() => setOpen(false)}>
                  {msg.link.label} →
                </Link>
              )}
            </div>
          ))}
          {typing && (
            <div className="chatbot__bubble chatbot__bubble--assistant chatbot__bubble--typing" aria-live="polite">
              <span className="chatbot__dot" />
              <span className="chatbot__dot" />
              <span className="chatbot__dot" />
            </div>
          )}
        </div>

        <div className="chatbot__quick">
          {quickReplies.map((q) => (
            <button
              key={q}
              type="button"
              className="chatbot__chip"
              onClick={() => sendMessage(q)}
              disabled={typing}
            >
              {q}
            </button>
          ))}
        </div>

        <form className="chatbot__form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="chatbot__input"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={typing}
            aria-label="Chat message"
            autoComplete="off"
          />
          <button
            type="submit"
            className="chatbot__send"
            aria-label="Send message"
            disabled={!input.trim() || typing}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>

      <button
        type="button"
        className={`chatbot__toggle${open ? ' chatbot__toggle--open' : ''}`}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
