'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FileText, 
  Clock, 
  MapPin, 
  Sparkles, 
  Timer,
  Coffee
} from 'lucide-react';
import { BottomDock } from '@/components/navigation/bottom-dock';
import { CommandPalette } from '@/components/command/command-palette';
import { RecoveryModal } from '@/components/modals/recovery-modal';
import confetti from 'canvas-confetti';

export function ToolsViewWrapper() {
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [completedSessions, setCompletedSessions] = useState(3);

  const [commandOpen, setCommandOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && pomodoroSeconds > 0) {
      interval = setInterval(() => setPomodoroSeconds(prev => prev - 1), 1000);
    } else if (pomodoroSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (pomodoroMode === 'work') {
        setCompletedSessions(prev => prev + 1);
        setPomodoroMode('shortBreak');
        setPomodoroSeconds(5 * 60);
        confetti({ particleCount: 40, spread: 80, origin: { y: 0.5 } });
      } else {
        setPomodoroMode('work');
        setPomodoroSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, pomodoroSeconds, pomodoroMode]);

  const switchMode = (mode: 'work' | 'shortBreak' | 'longBreak') => {
    setPomodoroMode(mode);
    setIsTimerRunning(false);
    if (mode === 'work') setPomodoroSeconds(25 * 60);
    else if (mode === 'shortBreak') setPomodoroSeconds(5 * 60);
    else setPomodoroSeconds(15 * 60);
  };

  const minutes = Math.floor(pomodoroSeconds / 60);
  const seconds = pomodoroSeconds % 60;

  return (
    <div className="relative">
      <div className="space-y-8">
        <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Student Productivity Tools</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Pomodoro Focus Timer, Master Routine Viewer (todo.md), Break Advisor & Location Solver.
            </p>
          </div>

          <Link
            href="/master-plan"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition shadow-lg shadow-primary/20"
          >
            <FileText className="w-4 h-4" />
            <span>View Master Routine (todo.md)</span>
          </Link>
        </div>

        <div className="bg-card border-2 border-primary/30 p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="p-2.5 bg-primary/10 text-primary rounded-xl border border-primary/30">
                <Timer className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Pomodoro Focus Timer</h2>
                <p className="text-xs text-muted-foreground">25m Deep Work / 5m Break Cycles</p>
              </div>
            </div>

            <div className="flex bg-secondary p-1 rounded-xl border border-border text-xs">
              <button
                onClick={() => switchMode('work')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  pomodoroMode === 'work' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                25m Focus
              </button>
              <button
                onClick={() => switchMode('shortBreak')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  pomodoroMode === 'shortBreak' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                5m Break
              </button>
              <button
                onClick={() => switchMode('longBreak')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  pomodoroMode === 'longBreak' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                15m Rest
              </button>
            </div>
          </div>

          <div className="text-center py-6 space-y-2">
            <div className="text-7xl sm:text-8xl font-black font-mono tracking-tighter text-foreground">
              {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              Sessions Completed Today: <strong className="text-primary font-bold">{completedSessions}</strong>
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-8 py-3.5 rounded-2xl font-bold text-sm transition shadow-xl flex items-center gap-2 ${
                isTimerRunning
                  ? 'bg-rose-500 text-black shadow-rose-500/20'
                  : 'bg-primary text-primary-foreground hover:opacity-90 shadow-primary/20'
              }`}
            >
              {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isTimerRunning ? 'Pause Timer' : 'Start Focus Session'}</span>
            </button>

            <button
              onClick={() => { setIsTimerRunning(false); setPomodoroSeconds(25 * 60); }}
              className="p-3.5 rounded-2xl bg-secondary border border-border text-foreground hover:bg-card transition"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-400" /> Break Mode Advisor
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-secondary rounded-xl border border-border font-medium">
                <span className="font-bold text-primary block">25 Minutes Free Between Classes</span>
                <p className="text-muted-foreground mt-0.5">Suggested: Revise AI Lecture notes or Solve 1 Easy LeetCode problem.</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Library vs Hostel Decision Engine
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-secondary rounded-xl border border-border font-medium">
                <span className="font-bold text-emerald-400 block">AI DECISION: Go to Library</span>
                <p className="text-muted-foreground mt-0.5">Gap = 42 mins &gt; 30 mins limit. Quiet atmosphere optimal for DSA focus.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomDock
        activeTab="tools"
        onNavigateTab={(tab) => {
          if (tab === 'home') window.location.href = '/';
          else if (tab === 'today') window.location.href = '/today';
          else if (tab === 'timeline') window.location.href = '/timeline';
          else if (tab === 'subjects') window.location.href = '/subjects';
          else if (tab === 'dsa') window.location.href = '/dsa';
          else if (tab === 'health') window.location.href = '/health';
          else if (tab === 'settings') window.location.href = '/settings';
          else if (tab === 'tools') window.location.href = '/tools';
        }}
        onOpenCommandPalette={() => setCommandOpen(true)}
      />

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onNavigateTab={(tab) => {
          if (tab === 'home') window.location.href = '/';
          else if (tab === 'today') window.location.href = '/today';
          else if (tab === 'timeline') window.location.href = '/timeline';
          else if (tab === 'subjects') window.location.href = '/subjects';
          else if (tab === 'dsa') window.location.href = '/dsa';
          else if (tab === 'health') window.location.href = '/health';
          else if (tab === 'settings') window.location.href = '/settings';
          else if (tab === 'tools') window.location.href = '/tools';
        }}
        onOpenRecovery={() => setRecoveryOpen(true)}
        onLogWater={() => {}}
      />

      <RecoveryModal
        isOpen={recoveryOpen}
        onClose={() => setRecoveryOpen(false)}
        onConfirmRecovery={() => {}}
      />
    </div>
  );
}
