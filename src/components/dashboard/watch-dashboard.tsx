'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Flame, 
  Droplets, 
  Moon, 
  Sun, 
  Zap, 
  MapPin, 
  BookOpen, 
  Dumbbell, 
  Coffee, 
  CheckSquare, 
  Compass,
  Wind,
  Target,
  Sparkles
} from 'lucide-react';
import { ProgressRings } from '@/components/ui/progress-rings';
import type { DecisionState, TimelineActivity } from '@/lib/types';
import confetti from 'canvas-confetti';

interface WatchDashboardProps {
  decision: DecisionState;
  onNavigateTab: (tab: string) => void;
  onOpenRecovery: () => void;
}

export function WatchDashboard({ decision, onNavigateTab, onOpenRecovery }: WatchDashboardProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [waterMls, setWaterMls] = useState(2250);
  const [streakDays, setStreakDays] = useState(14);
  const [focusMode, setFocusMode] = useState<'Deep Work' | 'Lecture Class' | 'Calisthenics' | 'Recovery'>('Deep Work');

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogWater = (amount: number) => {
    setWaterMls((prev) => Math.min(3500, prev + amount));
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#64D2FF', '#00F0FF', '#30D158']
    });
  };

  const formattedTime = time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '06:30:00';
  const formattedDate = time ? time.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }) : 'Monday, Aug 3';

  return (
    <div className="space-y-6 pb-24 pt-16">
      {/* Top Banner: Big Time Display & Streak Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900/90 via-slate-900/80 to-zinc-950/90 border border-white/10 p-6 rounded-3xl backdrop-blur-2xl shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>{formattedDate} • HeyDebo OS v2.5</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight font-mono">
              {formattedTime}
            </h1>
            
            <p className="text-sm text-zinc-400 mt-2 max-w-md italic font-sans">
              &ldquo;Discipline equals freedom. Solve 2 LeetCode Hard problems before 9 AM.&rdquo;
            </p>
          </div>

          {/* Quick Stats Pill Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Streak Badge */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 px-4 py-2.5 rounded-2xl">
              <Flame className="w-5 h-5 text-amber-400 animate-bounce" />
              <div>
                <div className="text-xs text-amber-300 font-bold">{streakDays} DAY STREAK</div>
                <div className="text-[10px] text-amber-400/80">9+ CGPA Velocity</div>
              </div>
            </div>

            {/* Weather Widget */}
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
              <Sun className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-xs text-white font-bold">26°C Sunny</div>
                <div className="text-[10px] text-zinc-400">Campus Humidity 45%</div>
              </div>
            </div>

            {/* Sleep Score Widget */}
            <div className="flex items-center space-x-2 bg-purple-500/15 border border-purple-500/30 px-4 py-2.5 rounded-2xl">
              <Moon className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-xs text-purple-300 font-bold">88 Sleep Score</div>
                <div className="text-[10px] text-purple-400/80">7.5h Deep REM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Apple Watch Rings + Current Activity Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Concentric Progress Rings Card (4 cols) */}
        <div className="lg:col-span-5 bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Apple Watch Dashboard
            </h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-mono">
              ALL SYSTEMS GO
            </span>
          </div>

          <ProgressRings 
            focusProgress={85}
            dsaProgress={72}
            workoutProgress={60}
            hydrationProgress={Math.round((waterMls / 3500) * 100)}
            sleepScore={88}
          />

          {/* Ring Legend Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#30D158]" />
              <span className="text-zinc-300 text-[11px]">Focus (85%)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
              <span className="text-zinc-300 text-[11px]">Google DSA (72%)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D55]" />
              <span className="text-zinc-300 text-[11px]">Calisthenics (60%)</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#64D2FF]" />
              <span className="text-zinc-300 text-[11px]">Hydration ({Math.round((waterMls / 3500) * 100)}%)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Current Activity Card + Location Recommendation (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Current Activity Hero Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-cyan-950/40 via-zinc-900/90 to-blue-950/40 border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-xl shadow-xl shadow-cyan-500/5">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold rounded-full border border-cyan-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                ACTIVE MINUTE HERO TASK
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {decision.currentActivity?.startTime} - {decision.currentActivity?.endTime}
              </span>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              {decision.currentActivity?.title || 'Google DSA Deep Work'}
            </h2>

            <p className="text-xs text-zinc-300 mb-4">
              {decision.currentActivity?.purpose}
            </p>

            {/* Required Checklist & Location Pill */}
            <div className="bg-black/40 border border-white/10 p-4 rounded-2xl space-y-3 mb-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Location: <strong className="text-white">{decision.currentActivity?.location}</strong>
                </span>
                <span className="text-cyan-400 font-mono font-bold">
                  {decision.walkingTimeText}
                </span>
              </div>

              {/* Checklist preview */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                {decision.currentActivity?.checklist.map((c) => (
                  <div key={c.id} className="flex items-center space-x-2 text-xs text-zinc-300">
                    <CheckSquare className={`w-3.5 h-3.5 ${c.completed ? 'text-emerald-400' : 'text-zinc-500'}`} />
                    <span className={c.completed ? 'line-through text-zinc-500' : ''}>{c.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('timeline')}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs py-3 rounded-2xl transition shadow-lg shadow-cyan-500/20"
              >
                Open Full Timeline
              </button>
              <button
                onClick={() => onNavigateTab('dsa')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-3 rounded-2xl border border-white/15 transition"
              >
                Go to Google DSA
              </button>
              <button
                onClick={onOpenRecovery}
                className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-xs px-4 py-3 rounded-2xl border border-rose-500/40 transition"
              >
                I&apos;m Behind
              </button>
            </div>
          </div>

          {/* Quick Focus Mode & Water Tracker Bar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Water Tracker Card */}
            <div className="bg-zinc-900/60 border border-white/10 p-5 rounded-3xl backdrop-blur-xl flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-400" /> Water Intake
                </span>
                <span className="text-xs font-mono text-cyan-300 font-bold">{waterMls} / 3500 ml</span>
              </div>

              {/* Water Progress Bar */}
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(waterMls / 3500) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleLogWater(250)}
                  className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold py-2 rounded-xl border border-cyan-500/30 transition"
                >
                  +250ml
                </button>
                <button
                  onClick={() => handleLogWater(500)}
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-semibold py-2 rounded-xl border border-blue-500/30 transition"
                >
                  +500ml
                </button>
              </div>
            </div>

            {/* Focus Mode Selector Card */}
            <div className="bg-zinc-900/60 border border-white/10 p-5 rounded-3xl backdrop-blur-xl flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" /> Focus State
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                  {focusMode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {(['Deep Work', 'Lecture Class', 'Calisthenics', 'Recovery'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setFocusMode(mode)}
                    className={`py-2 px-3 rounded-xl border text-[11px] font-medium transition text-left ${
                      focusMode === mode
                        ? 'bg-white/20 border-white/40 text-white font-bold'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
