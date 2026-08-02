'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Sparkles, Check, X, ShieldAlert, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmRecovery: () => void;
}

export function RecoveryModal({ isOpen, onClose, onConfirmRecovery }: RecoveryModalProps) {
  const [rebuilding, setRebuilding] = useState(false);

  if (!isOpen) return null;

  const handleApply = () => {
    setRebuilding(true);
    setTimeout(() => {
      onConfirmRecovery();
      setRebuilding(false);
      onClose();
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00F0FF', '#30D158', '#FF2D55']
      });
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-zinc-900 border border-rose-500/40 rounded-3xl p-6 shadow-2xl space-y-5 text-white"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-white">AI Emergency Recovery Mode</h3>
                <p className="text-xs text-rose-300">Schedule re-alignment protocol</p>
              </div>
            </div>

            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 text-xs text-zinc-300">
            <p className="bg-rose-950/40 p-3 rounded-2xl border border-rose-500/30 text-rose-200">
              ⚡ <strong>No Panic. Zero Guilt.</strong> The AI is dropping non-essential tasks and compressing remaining focus blocks to save your day.
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">AI RE-BALANCING ACTIONS:</div>
              <div className="flex items-center space-x-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dropped non-urgent administrative reading</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Shifted Google DSA 2-hour block to 45m High-Yield LeetCode Hard focus</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Preserved Calisthenics workout & sleep wind-down timing</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-semibold border border-white/10 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={rebuilding}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold transition shadow-lg shadow-rose-500/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{rebuilding ? 'Recalculating Schedule...' : 'Apply AI Recovery'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
