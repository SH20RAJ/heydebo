'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Flame, 
  Trophy, 
  Sparkles,
  Activity,
  Heart,
  Scale
} from 'lucide-react';
import type { CalisthenicsExercise, CalisthenicsDay } from '@/lib/types';
import confetti from 'canvas-confetti';

interface CalisthenicsViewProps {
  exercises: CalisthenicsExercise[];
  onToggleExercise: (id: string) => void;
}

export function CalisthenicsView({ exercises, onToggleExercise }: CalisthenicsViewProps) {
  const [selectedDay, setSelectedDay] = useState<CalisthenicsDay>('Monday');
  const [restTimerSeconds, setRestTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Body stats logger
  const [weightKg, setWeightKg] = useState(74.5);
  const [bodyFatPercent, setBodyFatPercent] = useState(11.2);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && restTimerSeconds > 0) {
      interval = setInterval(() => {
        setRestTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (restTimerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, restTimerSeconds]);

  const startRestTimer = (secs: number) => {
    setRestTimerSeconds(secs);
    setTimerRunning(true);
  };

  const days: CalisthenicsDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredExercises = exercises.filter(e => e.day === selectedDay);

  const handleToggle = (id: string) => {
    onToggleExercise(id);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FF2D55', '#FFD60A', '#30D158']
    });
  };

  return (
    <div className="space-y-6 pb-24 pt-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-rose-950/40 to-zinc-950 border border-rose-500/30 p-6 rounded-3xl backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400 uppercase tracking-widest mb-1">
              <Dumbbell className="w-4 h-4" />
              <span>5-Day Calisthenics & Skill Progression</span>
            </div>
            <h1 className="text-3xl font-black text-white">Calisthenics Athletic OS</h1>
            <p className="text-xs text-zinc-400 mt-1">Weighted Dips, Front Lever, Muscle-Up transitions & Handstand push-ups.</p>
          </div>

          {/* Rest Timer Widget */}
          <div className="bg-black/60 border border-rose-500/40 p-4 rounded-2xl flex items-center space-x-4">
            <div className="text-center">
              <div className="text-xs uppercase font-bold text-rose-400 tracking-wider">Rest Timer</div>
              <div className="text-2xl font-black font-mono text-white">
                {Math.floor(restTimerSeconds / 60)}:{restTimerSeconds % 60 < 10 ? '0' : ''}{restTimerSeconds % 60}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="p-2.5 bg-rose-500 hover:bg-rose-400 text-black rounded-xl transition"
              >
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => { setRestTimerSeconds(90); setTimerRunning(false); }}
                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/10 text-xs">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl border font-bold transition ${
                selectedDay === day
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises List & Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExercises.map(ex => (
          <div
            key={ex.id}
            className={`p-5 rounded-3xl border transition-all ${
              ex.completedToday
                ? 'bg-zinc-900/40 border-emerald-500/30'
                : 'bg-zinc-900/80 border-white/10 hover:border-rose-500/40'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold uppercase px-2.5 py-0.5 rounded-full border border-rose-500/30 font-mono">
                {ex.targetArea}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">Rest: {ex.restSeconds}s</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{ex.name}</h3>

            <div className="flex items-center space-x-4 my-3 text-xs font-mono bg-black/40 p-3 rounded-2xl border border-white/5">
              <div>
                <span className="text-zinc-500 block text-[10px]">TARGET SETS</span>
                <strong className="text-white text-base">{ex.sets} Sets</strong>
              </div>
              <div className="border-l border-white/10 pl-4">
                <span className="text-zinc-500 block text-[10px]">REPS / HOLD</span>
                <strong className="text-rose-400 text-base">{ex.reps}</strong>
              </div>
            </div>

            <p className="text-xs text-zinc-400 mb-4 font-sans">💡 {ex.notes}</p>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <button
                onClick={() => handleToggle(ex.id)}
                className={`flex items-center space-x-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition ${
                  ex.completedToday
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{ex.completedToday ? 'Completed Set' : 'Mark Done'}</span>
              </button>

              <button
                onClick={() => startRestTimer(ex.restSeconds)}
                className="text-xs text-zinc-300 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/10 transition"
              >
                Start {ex.restSeconds}s Rest
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Body Measurement Card */}
      <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-rose-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Aesthetic Body Measurement Logger</h4>
            <p className="text-xs text-zinc-400">Target: 74kg @ 10% Body Fat (V-Taper Aesthetics)</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
            <div className="text-zinc-400 text-[10px]">WEIGHT</div>
            <div className="font-mono font-bold text-white text-base">{weightKg} kg</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
            <div className="text-zinc-400 text-[10px]">BODY FAT</div>
            <div className="font-mono font-bold text-rose-400 text-base">{bodyFatPercent}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
