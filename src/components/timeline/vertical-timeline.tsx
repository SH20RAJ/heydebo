'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Backpack, 
  Zap, 
  Footprints,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import type { TimelineActivity } from '@/lib/types';

interface VerticalTimelineProps {
  timeline: TimelineActivity[];
  onToggleChecklist: (activityId: string, itemIdx: number) => void;
  onRescheduleMissed: (activityId: string) => void;
}

export function VerticalTimeline({ timeline, onToggleChecklist, onRescheduleMissed }: VerticalTimelineProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTimeline = filterCategory === 'all' 
    ? timeline 
    : timeline.filter(item => item.category === filterCategory);

  return (
    <div className="space-y-6 pb-24 pt-16">
      {/* Timeline Header & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 border border-white/10 p-5 rounded-3xl backdrop-blur-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Full Daily Schedule Timeline
          </h2>
          <p className="text-xs text-zinc-400">06:00 Wake Up to 23:00 Sleep Wind-Down Protocol</p>
        </div>

        {/* Filter Pill Selector */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {['all', 'dsa', 'lecture', 'workout', 'library', 'supplement'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-full border text-[11px] font-medium capitalize transition ${
                filterCategory === cat
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-bold'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Stream */}
      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {filteredTimeline.map((item, idx) => {
          const isActive = item.status === 'active';
          const isCompleted = item.status === 'completed';
          const isMissed = item.status === 'missed';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative"
            >
              {/* Timeline Bullet Node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-cyan-400 border-cyan-300 shadow-lg shadow-cyan-400/50 scale-125'
                    : isCompleted
                    ? 'bg-emerald-500 border-emerald-400'
                    : isMissed
                    ? 'bg-rose-500 border-rose-400'
                    : 'bg-zinc-800 border-zinc-600'
                }`}
              >
                {isActive && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
              </div>

              {/* Activity Glass Card */}
              <div
                className={`p-5 rounded-3xl border transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/40 via-zinc-900/90 to-blue-950/40 border-cyan-500/50 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                    : isCompleted
                    ? 'bg-zinc-900/40 border-emerald-500/30 opacity-80'
                    : isMissed
                    ? 'bg-rose-950/30 border-rose-500/40'
                    : 'bg-zinc-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Top Card Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-bold text-white bg-white/10 px-2.5 py-1 rounded-xl">
                      {item.startTime} - {item.endTime}
                    </span>
                    <span className="text-xs uppercase font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                      {item.category}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {isActive && (
                    <span className="text-[11px] font-bold text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/40 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      ACTIVE NOW
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> COMPLETED
                    </span>
                  )}
                  {isMissed && (
                    <button
                      onClick={() => onRescheduleMissed(item.id)}
                      className="text-[11px] font-bold text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 px-3 py-1 rounded-full border border-rose-500/40 transition flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" /> MISSED • Reschedule
                    </button>
                  )}
                </div>

                {/* Title & Purpose */}
                <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-400 mb-4">{item.purpose}</p>

                {/* Info Bar: Location, Required Items, Energy */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-black/30 p-3 rounded-2xl border border-white/5 text-xs text-zinc-300 mb-4">
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <Footprints className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item.walkingTimeMins} mins walk</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Energy: <strong>{item.energyReq}</strong></span>
                  </div>
                </div>

                {/* Required Equipment / Items */}
                {item.requiredItems && item.requiredItems.length > 0 && (
                  <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-3">
                    <Backpack className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-medium text-zinc-300">Take:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.requiredItems.map((req, rIdx) => (
                        <span key={rIdx} className="bg-white/5 px-2 py-0.5 rounded-lg border border-white/10 text-[11px]">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Checklist */}
                {item.checklist && item.checklist.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <div className="text-[11px] uppercase font-bold text-zinc-500 tracking-wider">
                      Checklist ({item.checklist.filter(c => c.completed).length} / {item.checklist.length})
                    </div>
                    {item.checklist.map((check, cIdx) => (
                      <button
                        key={check.id}
                        onClick={() => onToggleChecklist(item.id, cIdx)}
                        className="w-full flex items-center justify-between p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition text-left text-xs"
                      >
                        <span className={check.completed ? 'line-through text-zinc-500' : 'text-zinc-200 font-medium'}>
                          {check.text}
                        </span>
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            check.completed ? 'text-emerald-400 fill-emerald-400/20' : 'text-zinc-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
