'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  CheckCircle2, 
  Clock, 
  Flame, 
  AlertOctagon, 
  BookOpen, 
  Trophy, 
  Filter,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import type { DSAProblem, DSAPattern } from '@/lib/types';
import confetti from 'canvas-confetti';

interface DSAViewProps {
  problems: DSAProblem[];
  onToggleSolve: (id: string) => void;
}

export function DSAView({ problems, onToggleSolve }: DSAViewProps) {
  const [selectedPattern, setSelectedPattern] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<'problems' | 'roadmap' | 'mistakes' | 'heatmap'>('problems');

  const patterns: DSAPattern[] = [
    'Two Pointers', 
    'Sliding Window', 
    'Monotonic Stack', 
    'Dynamic Programming', 
    'Graph BFS/DFS', 
    'Trie', 
    'Binary Search', 
    'Segment Tree'
  ];

  const filteredProblems = selectedPattern === 'all'
    ? problems
    : problems.filter(p => p.pattern === selectedPattern);

  const solvedCount = problems.filter(p => p.solved).length;
  const totalCount = problems.length;

  const handleSolveClick = (id: string) => {
    onToggleSolve(id);
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00F0FF', '#30D158', '#FFD60A']
    });
  };

  return (
    <div className="space-y-6 pb-24 pt-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-cyan-950/40 to-zinc-950 border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <Code2 className="w-4 h-4" />
              <span>Google L4 Interview Preparation Engine</span>
            </div>
            <h1 className="text-3xl font-black text-white">Google DSA & System Architecture</h1>
            <p className="text-xs text-zinc-400 mt-1">Master top 15 problem patterns, monotonic stacks, and DP memoization tables.</p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center space-x-3">
            <div className="bg-cyan-500/20 border border-cyan-500/40 px-4 py-2.5 rounded-2xl text-center">
              <div className="text-xl font-bold font-mono text-cyan-300">{solvedCount} / {totalCount}</div>
              <div className="text-[10px] text-cyan-400 uppercase font-semibold">Problems Solved</div>
            </div>

            <div className="bg-amber-500/20 border border-amber-500/40 px-4 py-2.5 rounded-2xl text-center">
              <div className="text-xl font-bold font-mono text-amber-300">LeetCode #382</div>
              <div className="text-[10px] text-amber-400 uppercase font-semibold">Weekly Contest Sat 8PM</div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/10 text-xs">
          {[
            { id: 'problems', label: 'Daily Problems Queue' },
            { id: 'roadmap', label: '12-Week Google Roadmap' },
            { id: 'mistakes', label: 'Mistakes Notebook' },
            { id: 'heatmap', label: '365-Day Activity Heatmap' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl border font-semibold transition ${
                selectedTab === tab.id
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Problems Queue & Pattern Filters */}
      {selectedTab === 'problems' && (
        <div className="space-y-6">
          {/* Pattern Filter Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedPattern('all')}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold shrink-0 transition ${
                selectedPattern === 'all'
                  ? 'bg-white/20 border-white/40 text-white'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
              }`}
            >
              All Patterns ({problems.length})
            </button>

            {patterns.map(pat => (
              <button
                key={pat}
                onClick={() => setSelectedPattern(pat)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold shrink-0 transition ${
                  selectedPattern === pat
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
                }`}
              >
                {pat}
              </button>
            ))}
          </div>

          {/* Problems List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProblems.map(prob => (
              <div
                key={prob.id}
                className={`p-5 rounded-3xl border transition-all ${
                  prob.solved
                    ? 'bg-zinc-900/40 border-emerald-500/30'
                    : 'bg-zinc-900/80 border-white/10 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                      prob.difficulty === 'Hard'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {prob.difficulty}
                  </span>

                  <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/20 font-mono">
                    {prob.pattern}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 flex items-center justify-between">
                  {prob.title}
                  <span className="text-[10px] text-zinc-400 font-mono">{prob.googleFrequency}</span>
                </h3>

                {prob.notes && (
                  <p className="text-xs text-zinc-400 mb-4 bg-black/30 p-2.5 rounded-xl border border-white/5 font-mono">
                    💡 {prob.notes}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <button
                    onClick={() => handleSolveClick(prob.id)}
                    className={`flex items-center space-x-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition ${
                      prob.solved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{prob.solved ? 'Solved & Reviewed' : 'Mark as Solved'}</span>
                  </button>

                  {prob.mistakeType && (
                    <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-1 rounded-lg border border-rose-500/20">
                      ⚠️ Prev Mistake: {prob.mistakeType}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 12-Week Roadmap */}
      {selectedTab === 'roadmap' && (
        <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-4">
          <h3 className="text-lg font-bold text-white">Google L4 Interview 12-Week Roadmap</h3>
          <div className="space-y-3 text-xs">
            {[
              { week: 'Weeks 1-2', topic: 'Arrays, Two Pointers, Sliding Window', status: 'Completed' },
              { week: 'Weeks 3-4', topic: 'Monotonic Stack, Queues, Binary Search on Answer', status: 'In Progress' },
              { week: 'Weeks 5-6', topic: 'Trees, Trie, Graph BFS/DFS & Topological Sort', status: 'Upcoming' },
              { week: 'Weeks 7-8', topic: 'Dynamic Programming: 1D, 2D Grid, Knapsack, Digit DP', status: 'Upcoming' },
              { week: 'Weeks 9-10', topic: 'Advanced Graph (Dijkstra, Tarjan SCC, Disjoint Set Union)', status: 'Upcoming' },
              { week: 'Weeks 11-12', topic: 'Google Mock Interviews & System Design Foundations', status: 'Upcoming' },
            ].map((w, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
                <div>
                  <span className="font-mono text-cyan-400 font-bold mr-3">{w.week}</span>
                  <span className="text-white font-medium">{w.topic}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  w.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  {w.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Mistakes Notebook */}
      {selectedTab === 'mistakes' && (
        <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-4">
          <h3 className="text-lg font-bold text-white">Mistakes & Edge Case Notebook</h3>
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-2xl">
              <div className="font-bold text-rose-300 text-sm mb-1">LC 84: Histogram Off-By-One Width</div>
              <p className="text-zinc-300">When stack is empty after popping, width is `i` instead of `i - stack.top() - 1`.</p>
            </div>
            <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl">
              <div className="font-bold text-amber-300 text-sm mb-1">Sliding Window Shrink Condition</div>
              <p className="text-zinc-300">Always decrement frequency map count BEFORE checking `map[char] == 0`.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Heatmap */}
      {selectedTab === 'heatmap' && (
        <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-4">
          <h3 className="text-lg font-bold text-white">365-Day Submission Heatmap</h3>
          <p className="text-xs text-zinc-400">Consistent daily problem-solving grid.</p>
          
          <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 pt-2">
            {Array.from({ length: 120 }).map((_, i) => {
              const intensity = (i * 7) % 5;
              const colors = ['bg-zinc-800', 'bg-emerald-950', 'bg-emerald-700', 'bg-emerald-500', 'bg-emerald-300'];
              return (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-sm ${colors[intensity]}`}
                  title={`Day ${i + 1}: ${intensity * 2} problems solved`}
                />
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
