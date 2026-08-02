'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Zap,
  CheckSquare
} from 'lucide-react';
import type { DecisionState } from '@/lib/types';
import confetti from 'canvas-confetti';

interface MissionControlProps {
  decision: DecisionState;
  onNavigateTab: (tab: string) => void;
  onOpenRecovery: () => void;
}

export function MissionControl({ decision, onNavigateTab, onOpenRecovery }: MissionControlProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [focusActive, setFocusActive] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '08:43';
  const formattedDate = time ? time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }) : 'Monday, Aug 3';

  const currentTask = decision.currentActivity;
  const nextTask = decision.nextActivity;

  const handleStartFocus = () => {
    setFocusActive(!focusActive);
    if (!focusActive) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-between py-12 px-2 max-w-3xl mx-auto space-y-8">
      {/* Top Header: Huge Whitespace & Clean Time */}
      <div className="text-center space-y-1">
        <div className="text-xs uppercase font-mono tracking-widest text-muted-foreground">
          {formattedDate} • MISSION CONTROL
        </div>
        <h1 className="text-7xl sm:text-8xl font-black font-mono tracking-tighter text-foreground">
          {formattedTime}
        </h1>
      </div>

      {/* Hero Card: THE ONE CURRENT MISSION */}
      <motion.div 
        layout
        className="bg-card border-2 border-primary/40 p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <span className="px-3.5 py-1 bg-primary/10 text-primary text-xs font-mono font-bold rounded-full border border-primary/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            CURRENT MISSION
          </span>

          <span className="text-xs font-mono text-muted-foreground">
            {currentTask?.startTime || '09:30'} - {currentTask?.endTime || '11:00'}
          </span>
        </div>

        {/* Big Mission Title */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            {currentTask?.title || 'Compiler Design Lecture'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {currentTask?.purpose || 'Target 9+ CGPA & 90%+ attendance record'}
          </p>
        </div>

        {/* Location & Time Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-secondary/50 p-4 rounded-2xl border border-border text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">LOCATION</span>
            <strong className="text-foreground text-sm font-semibold flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              {currentTask?.location || 'Room 220'}
            </strong>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">STARTS IN</span>
            <strong className="text-primary text-sm font-mono font-bold mt-0.5 block">
              13 minutes
            </strong>
          </div>

          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-bold">LEAVE HOSTEL IN</span>
            <strong className="text-amber-400 text-sm font-mono font-bold mt-0.5 block">
              7 minutes
            </strong>
          </div>
        </div>

        {/* Gear / Checklist Requirements */}
        {currentTask?.requiredItems && currentTask.requiredItems.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border">
            <span className="text-[11px] uppercase font-bold text-muted-foreground tracking-wider">TAKE WITH YOU:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {currentTask.requiredItems.map((item, idx) => (
                <span key={idx} className="bg-secondary px-3 py-1 rounded-xl border border-border text-foreground font-medium flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* START FOCUS BUTTON */}
        <div className="pt-2">
          <button
            onClick={handleStartFocus}
            className={`w-full py-4 rounded-2xl font-bold text-sm transition shadow-xl flex items-center justify-center gap-2 ${
              focusActive
                ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                : 'bg-primary text-primary-foreground hover:opacity-90 shadow-primary/20'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{focusActive ? 'Focus Mode Active (Tap to Stop)' : 'START MISSION FOCUS'}</span>
          </button>
        </div>
      </motion.div>

      {/* Next Mission & Minimal Progress Section */}
      <div className="space-y-4">
        {/* Next Preview */}
        {nextTask && (
          <div className="bg-card/50 border border-border p-4 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <span className="text-muted-foreground uppercase font-bold tracking-wider text-[10px]">NEXT:</span>
              <span className="font-semibold text-foreground">{nextTask.title}</span>
            </div>
            <span className="text-muted-foreground font-mono">{nextTask.startTime} • {nextTask.location}</span>
          </div>
        )}

        {/* 3 Minimal Progress Bars */}
        <div className="bg-card border border-border p-5 rounded-2xl space-y-3 text-xs">
          {/* Semester Progress */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-muted-foreground">Semester Progress</span>
              <strong className="text-foreground">65%</strong>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '65%' }} />
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-muted-foreground">Today&apos;s Tasks</span>
              <strong className="text-foreground">85%</strong>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          {/* DSA Target */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-muted-foreground">Google DSA Topic</span>
              <strong className="text-foreground">60%</strong>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
