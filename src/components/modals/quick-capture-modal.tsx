'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveNote: (title: string, content: string) => void;
}

export function QuickCaptureModal({ isOpen, onClose, onSaveNote }: QuickCaptureModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSaveNote(title, content);
    setTitle('');
    setContent('');
    onClose();
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md bg-zinc-900 border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4 text-white"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">Second Brain Quick Capture</h3>
            </div>
            <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-white transition">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Idea / Task Title</label>
              <input
                type="text"
                placeholder="e.g. DCCN Sliding window CRC proof formula..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Detailed Notes / Markdown</label>
              <textarea
                rows={3}
                placeholder="Add code snippets, LeetCode edge cases, or lecture takeaways..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save to Second Brain</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
