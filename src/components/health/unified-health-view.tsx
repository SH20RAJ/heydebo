'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Droplets, 
  Moon, 
  Coffee, 
  Pill, 
  Dumbbell, 
  Footprints, 
  Smile, 
  CheckCircle2,
  Scale
} from 'lucide-react';
import type { SupplementItem, CalisthenicsExercise, CalisthenicsDay } from '@/lib/types';
import { healthFixture } from '@/fixtures';
import confetti from 'canvas-confetti';

interface UnifiedHealthViewProps {
  supplements: SupplementItem[];
  calisthenics: CalisthenicsExercise[];
  onToggleSupplement: (id: string) => void;
  onToggleCalisthenics: (id: string) => void;
}

export function UnifiedHealthView({
  supplements,
  calisthenics,
  onToggleSupplement,
  onToggleCalisthenics
}: UnifiedHealthViewProps) {
  const [waterMls, setWaterMls] = useState(healthFixture.waterMl);
  const [selectedDay, setSelectedDay] = useState<CalisthenicsDay>('Monday');

  const handleLogWater = (amount: number) => {
    setWaterMls(prev => Math.min(3500, prev + amount));
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const days: CalisthenicsDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dayWorkout = calisthenics.filter(c => c.day === selectedDay);

  return (
    <div className="space-y-6 pb-24 pt-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">Unified Health, Supplements & Fitness</h1>
          <p className="text-xs text-muted-foreground">Water, Sleep, Creatine, Coffee Cutoff & 5-Day Calisthenics Split.</p>
        </div>

        <span className="text-xs bg-emerald-500/10 text-emerald-400 font-mono px-3 py-1 rounded-full border border-emerald-500/30">
          Sleep Score: {healthFixture.sleepScore}
        </span>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        {/* Water */}
        <div className="bg-card border border-border p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1"><Droplets className="w-4 h-4 text-cyan-400" /> Water</span>
            <span className="font-mono font-bold text-foreground">{waterMls} / 3500ml</span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${(waterMls/3500)*100}%` }} />
          </div>
          <div className="flex gap-1 pt-1">
            <button onClick={() => handleLogWater(250)} className="flex-1 py-1 bg-secondary hover:bg-card border border-border rounded-lg text-[11px] font-bold text-foreground transition">+250ml</button>
            <button onClick={() => handleLogWater(500)} className="flex-1 py-1 bg-secondary hover:bg-card border border-border rounded-lg text-[11px] font-bold text-foreground transition">+500ml</button>
          </div>
        </div>

        {/* Sleep */}
        <div className="bg-card border border-border p-4 rounded-2xl space-y-1">
          <span className="text-muted-foreground flex items-center gap-1"><Moon className="w-4 h-4 text-purple-400" /> Sleep</span>
          <div className="text-xl font-bold font-mono text-foreground">{healthFixture.sleepHours} Hours</div>
          <span className="text-[10px] text-purple-400 font-mono">Deep REM Recovery</span>
        </div>

        {/* Coffee Cutoff */}
        <div className="bg-card border border-border p-4 rounded-2xl space-y-1">
          <span className="text-muted-foreground flex items-center gap-1"><Coffee className="w-4 h-4 text-amber-400" /> Coffee Cutoff</span>
          <div className="text-xl font-bold font-mono text-foreground">{healthFixture.caffeineCutoffTime}</div>
          <span className="text-[10px] text-emerald-400 font-mono">Window Active (100mg)</span>
        </div>

        {/* Creatine */}
        <div className="bg-card border border-border p-4 rounded-2xl space-y-1">
          <span className="text-muted-foreground flex items-center gap-1"><Pill className="w-4 h-4 text-cyan-400" /> Creatine</span>
          <div className="text-xl font-bold font-mono text-emerald-400">5g Taken</div>
          <span className="text-[10px] text-muted-foreground font-mono">ATP Cell Saturation</span>
        </div>
      </div>

      {/* 5-DAY CALISTHENICS SPLIT MODULE */}
      <div className="bg-card border border-border p-6 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-rose-500" /> 5-Day Calisthenics Athletic Split
            </h3>
            <p className="text-xs text-muted-foreground">Weighted Dips, Front Lever, Handstand Push-ups, Muscle-Ups & Core.</p>
          </div>

          <div className="flex gap-1 text-xs">
            {days.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition ${
                  selectedDay === d ? 'bg-rose-500 text-black border-rose-500' : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {d.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Exercises */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {dayWorkout.map(ex => (
            <div key={ex.id} className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-2">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-rose-400 font-bold">{ex.targetArea}</span>
                <span className="text-muted-foreground">Rest: {ex.restSeconds}s</span>
              </div>
              <h4 className="font-bold text-foreground text-sm">{ex.name}</h4>
              <div className="font-mono text-xs text-muted-foreground">{ex.sets} Sets x {ex.reps}</div>
              <button
                onClick={() => {
                  onToggleCalisthenics(ex.id);
                  confetti({ particleCount: 20, spread: 50, origin: { y: 0.7 } });
                }}
                className={`w-full py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                  ex.completedToday ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{ex.completedToday ? 'Completed' : 'Mark Exercise Done'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
