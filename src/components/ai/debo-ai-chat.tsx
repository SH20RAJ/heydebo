'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User, Sparkles, Zap, MapPin } from 'lucide-react';
import type { DecisionState } from '@/lib/types';

interface DeboAIChatProps {
  decision: DecisionState;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export function DeboAIChat({ decision }: DeboAIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hey Debo! I am your 24/7 Life OS & Performance Coach. Right now, you should be at ${decision.locationRecommendation} executing: ${decision.primaryAction}. How can I assist your 9+ CGPA & Google prep?`,
      timestamp: '09:30 AM'
    }
  ]);

  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = input;
    setInput('');

    // Generate intelligent AI Response
    setTimeout(() => {
      let aiText = `I recommend staying in the ${decision.locationRecommendation} and completing your current timeline block. Stay disciplined!`;

      if (query.toLowerCase().includes('lecture') || query.toLowerCase().includes('cancel')) {
        aiText = "⚡ Lecture cancelled? I have auto-allocated that 90-minute window to Google DSA Monotonic Stack practice and reviewing 5 DCCN PYQs.";
      } else if (query.toLowerCase().includes('tired') || query.toLowerCase().includes('nap')) {
        aiText = "🔋 Energy drop detected. Take a 20-minute power nap in your Hostel Room now. Set alarm for 20 mins. I have shifted your evening Calisthenics by 20 mins.";
      } else if (query.toLowerCase().includes('dsa') || query.toLowerCase().includes('leetcode')) {
        aiText = "💻 Google DSA Hint for Monotonic Stack: Always push indices onto the stack rather than values so you can calculate width `i - stack.top() - 1` easily!";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-24 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-cyan-950/40 to-zinc-950 border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-2xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Debo AI Personal Coach</h1>
            <p className="text-xs text-zinc-400">Automated decisions, DSA hints, schedule adjustments & motivation.</p>
          </div>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl h-[440px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto pr-2">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex items-start space-x-2.5 ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`p-2 rounded-xl text-xs ${
                  m.sender === 'user'
                    ? 'bg-cyan-500 text-black font-semibold'
                    : 'bg-white/10 text-zinc-200 border border-white/10'
                }`}
              >
                {m.sender === 'ai' && (
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">Debo AI Coach</span>
                )}
                <p>{m.text}</p>
                <span className="text-[9px] text-zinc-400 block text-right mt-1 font-mono">{m.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="flex items-center space-x-2 pt-4 border-t border-white/10">
          <input
            type="text"
            placeholder="Ask AI Coach: 'Lecture cancelled?', 'DSA Hint', 'Should I rest?'..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-black/50 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="p-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-2xl transition shadow-lg shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
