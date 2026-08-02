'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Coffee, 
  CheckCircle2, 
  Flame,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import type { DecisionState } from '@/lib/types';

interface DynamicIslandProps {
  decision: DecisionState;
  onOpenRecovery: () => void;
  onOpenQuickCapture: () => void;
}

export function DynamicIsland({ decision, onOpenRecovery, onOpenQuickCapture }: DynamicIslandProps) {
  const [expanded, setExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState('42:15');

  // Countdown clock simulator
  useEffect(() => {
    const timer = setInterval(() => {
      const mins = Math.floor(Math.random() * 50) + 10;
      const secs = Math.floor(Math.random() * 59);
      setTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        layout
        onClick={() => setExpanded(!expanded)}
        className="pointer-events-auto cursor-pointer bg-black/85 backdrop-blur-2xl border border-white/15 rounded-full text-white shadow-2xl shadow-cyan-500/10 transition-all duration-300 overflow-hidden"
        style={{
          width: expanded ? '92%' : 'auto',
          maxWidth: expanded ? '640px' : '480px',
        }}
      >
        {!expanded ? (
          /* Compact Collapsed Pill */
          <div className="flex items-center justify-between px-4 py-2.5 space-x-3 text-xs font-medium">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-cyan-300 tracking-wide truncate max-w-[160px] sm:max-w-[220px]">
                {decision.currentActivity?.title || 'System Active'}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-zinc-300">
              <div className="flex items-center space-x-1 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-mono text-cyan-400 border border-cyan-500/30">
                <Clock className="w-3 h-3 animate-spin text-cyan-400" />
                <span>{timeLeft}</span>
              </div>
              <div className="hidden sm:flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] border border-emerald-500/40">
                <MapPin className="w-2.5 h-2.5" />
                <span>{decision.locationRecommendation}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Expanded Full Island */
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    HeyDebo AI Decision Engine
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30 font-mono">LIVE</span>
                  </h4>
                  <p className="text-zinc-400 text-[11px]">{decision.reasoning}</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400" />
            </div>

            {/* Current Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-cyan-400" /> WHAT TO DO NOW
                </div>
                <p className="text-sm font-semibold text-white">{decision.primaryAction}</p>
                <p className="text-[11px] text-zinc-400">{decision.walkingTimeText}</p>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" /> RECOMMENDED LOCATION
                </div>
                <p className="text-sm font-semibold text-white">{decision.locationRecommendation}</p>
                <p className="text-[11px] text-zinc-400">
                  {decision.caffeineAllowed ? '☕ Caffeine Window Active (Cutoff 2 PM)' : '🚫 Caffeine Cutoff Reached'}
                </p>
              </div>
            </div>

            {/* Quick Control Bar */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenRecovery();
                }}
                className="flex items-center space-x-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs px-3.5 py-1.5 rounded-full border border-rose-500/40 transition font-medium"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>I&apos;m Behind (AI Recovery)</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenQuickCapture();
                }}
                className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white text-xs px-3.5 py-1.5 rounded-full border border-white/20 transition font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Quick Note / Capture</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
