import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { generateCarAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  externalMessage?: string;
}

const AIChatBot: React.FC<AIChatBotProps> = ({ isOpen, onClose, onOpen, externalMessage }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome to Marie Yashe Auto Concierge. How may I assist with your vehicle configuration today?",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Handle External Message Trigger
  useEffect(() => {
    if (externalMessage && isOpen) {
        handleExternalSend(externalMessage);
    }
  }, [externalMessage, isOpen]);

  const handleExternalSend = async (text: string) => {
      // Avoid duplicate triggers if last message is same
      if (messages[messages.length - 1].text === text && messages[messages.length - 1].role === 'user') return;

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        text: text,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const history = messages.slice(-5).map(m => `${m.role}: ${m.text}`);
        const responseText = await generateCarAdvice(userMsg.text, history);
        
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: responseText,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(-5).map(m => `${m.role}: ${m.text}`);
      const responseText = await generateCarAdvice(userMsg.text, history);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Minimal Toggle Button */}
      <button
        onClick={onOpen}
        className={`fixed bottom-8 right-8 z-40 bg-white text-black p-4 shadow-2xl transition-all duration-500 hover:scale-105 ${isOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <Sparkles className="w-6 h-6" strokeWidth={1.5} />
      </button>

      {/* Glass Panel Chat Window */}
      <div 
        className={`fixed bottom-8 right-8 z-50 w-[90vw] md:w-[450px] bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8 pointer-events-none'
        }`}
        style={{ height: '600px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <Bot className="w-5 h-5 text-white" strokeWidth={1.5} />
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-white">Concierge AI</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'text-right text-white'
                    : 'text-left text-gray-300'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">
                {msg.role === 'user' ? 'You' : 'AutoMate'}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <span className="text-xs text-gray-500 animate-pulse">Processing request...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Minimal Input */}
        <div className="p-6 border-t border-white/10">
          <div className="relative flex items-center border-b border-white/20 focus-within:border-white transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your inquiry..."
              className="w-full bg-transparent text-white py-3 pr-10 focus:outline-none placeholder-gray-600 font-light"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-0 text-white hover:opacity-70 transition-opacity disabled:opacity-30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChatBot;