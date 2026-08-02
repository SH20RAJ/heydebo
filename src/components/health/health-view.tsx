'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coffee, 
  Droplets, 
  Moon, 
  Zap, 
  CheckCircle2, 
  Pill, 
  HeartPulse, 
  Activity,
  Flame
} from 'lucide-react';
import type { SupplementItem } from '@/lib/types';
import confetti from 'canvas-confetti';

interface HealthViewProps {
  supplements: SupplementItem[];
  onToggleSupplement: (id: string) => void;
}

export function HealthView({ supplements, onToggleSupplement }: HealthViewProps) {
  const handleToggle = (id: string) => {
    onToggleSupplement(id);
    confetti({
      particleCount: 20,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#64D2FF', '#30D158', '#BF5AF2']
    });
  };

  return (
    <div className="space-y-6 pb-24 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 via-purple-950/40 to-zinc-950 border border-purple-500/30 p-6 rounded-3xl backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1">
              <Pill className="w-4 h-4" />
              <span>Biohacking & Anabolic Health OS</span>
            </div>
            <h1 className="text-3xl font-black text-white">Supplements, Caffeine & Sleep</h1>
            <p className="text-xs text-zinc-400 mt-1">Creatine ATP saturation, 2 PM caffeine cutoff & deep sleep optimization.</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-purple-500/20 border border-purple-500/40 p-3 rounded-2xl text-center font-mono">
              <div className="text-xl font-bold text-purple-300">88 Score</div>
              <div className="text-[10px] text-purple-400">Sleep Recovery</div>
            </div>

            <div className="bg-cyan-500/20 border border-cyan-500/40 p-3 rounded-2xl text-center font-mono">
              <div className="text-xl font-bold text-cyan-300">5g Creatine</div>
              <div className="text-[10px] text-cyan-400">ATP Saturation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Supplements List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supplements.map(sup => (
          <div
            key={sup.id}
            className={`p-5 rounded-3xl border transition-all ${
              sup.completedToday
                ? 'bg-zinc-900/40 border-emerald-500/30'
                : 'bg-zinc-900/80 border-white/10 hover:border-purple-500/40'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold uppercase px-2.5 py-0.5 rounded-full border border-purple-500/30 font-mono">
                {sup.timing}
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">{sup.dose}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{sup.name}</h3>
            <p className="text-xs text-zinc-400 mb-4 font-sans">💡 {sup.purpose}</p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => handleToggle(sup.id)}
                className={`flex items-center space-x-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition ${
                  sup.completedToday
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{sup.completedToday ? 'Taken Today' : 'Mark Taken'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
