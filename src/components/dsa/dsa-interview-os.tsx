'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  CheckCircle2, 
  Flame, 
  AlertOctagon, 
  Trophy, 
  ArrowDown, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import type { DSAProblem } from '@/lib/types';
import confetti from 'canvas-confetti';

interface DSAInterviewOSProps {
  problems: DSAProblem[];
  onToggleSolve: (id: string) => void;
}

export function DSAInterviewOS({ problems, onToggleSolve }: DSAInterviewOSProps) {
  const handleSolve = (id: string) => {
    onToggleSolve(id);
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-6 pb-24 pt-16 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">Google L4 Interview OS</h1>
          <p className="text-xs text-muted-foreground">Linear step-by-step problem solving pipeline.</p>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-full font-mono text-xs text-cyan-400 font-bold">
          Weekly Contest Sat 8PM
        </div>
      </div>

      {/* PIPELINE STEP 1: TODAY'S TOPIC */}
      <div className="bg-card border border-primary/40 p-6 rounded-3xl space-y-2">
        <div className="text-[10px] font-bold uppercase font-mono text-primary">STEP 1: TODAY&apos;S FOCUS TOPIC</div>
        <h2 className="text-2xl font-black text-foreground">Sliding Window & Monotonic Stack</h2>
        <p className="text-xs text-muted-foreground">Maintain non-decreasing index stack. On smaller element pop & calculate width.</p>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* PIPELINE STEP 2: 3 DAILY PROBLEMS */}
      <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
        <div className="text-[10px] font-bold uppercase font-mono text-emerald-400">STEP 2: 3 DAILY HIGH-YIELD PROBLEMS</div>

        <div className="space-y-3">
          {problems.slice(0, 3).map((prob) => (
            <div key={prob.id} className="p-4 rounded-2xl bg-secondary/50 border border-border flex items-center justify-between gap-4 text-xs">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-foreground text-sm">{prob.title}</span>
                  <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {prob.difficulty}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">{prob.googleFrequency}</span>
              </div>

              <button
                onClick={() => handleSolve(prob.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  prob.solved
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}
              >
                {prob.solved ? '✓ Solved' : 'Solve Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* PIPELINE STEP 3: MISTAKES & REVISION */}
      <div className="bg-card border border-border p-6 rounded-3xl space-y-3 text-xs">
        <div className="text-[10px] font-bold uppercase font-mono text-rose-400">STEP 3: MISTAKES NOTEBOOK & REVISION</div>
        <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl text-rose-200">
          ⚠️ <strong>Off-by-one edge case:</strong> When stack is empty after popping in LC 84, width is `i` instead of `i - stack.top() - 1`.
        </div>
      </div>
    </div>
  );
}
