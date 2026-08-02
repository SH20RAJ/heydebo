'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Coffee, 
  Dumbbell, 
  BookOpen, 
  Video, 
  Moon, 
  Droplets,
  Footprints
} from 'lucide-react';
import type { TimelineActivity } from '@/lib/types';

interface TodayStreamProps {
  timeline: TimelineActivity[];
  onToggleChecklist: (activityId: string, itemIdx: number) => void;
}

export function TodayStream({ timeline, onToggleChecklist }: TodayStreamProps) {
  return (
    <div className="space-y-6 pb-24 pt-16 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-black text-foreground">Today&apos;s Single Unified Stream</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Morning &rarr; Classes &rarr; Breaks &rarr; Supplements &rarr; Workout &rarr; Study &rarr; YouTube &rarr; Sleep.
        </p>
      </div>

      {/* Unified Timeline Stream */}
      <div className="space-y-4">
        {timeline.map((item) => {
          const isActive = item.status === 'active';
          const isCompleted = item.status === 'completed';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition ${
                isActive
                  ? 'bg-card border-primary ring-1 ring-primary shadow-lg'
                  : isCompleted
                  ? 'bg-card/40 border-border opacity-75'
                  : 'bg-card border-border'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-foreground bg-secondary px-2.5 py-1 rounded-lg">
                    {item.startTime} - {item.endTime}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                {isActive && (
                  <span className="text-[10px] font-bold text-primary bg-primary/20 px-2.5 py-0.5 rounded-full border border-primary/30">
                    ACTIVE NOW
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{item.purpose}</p>

              {/* Location & Walking Info */}
              <div className="flex items-center space-x-4 text-xs text-muted-foreground bg-secondary/50 p-2.5 rounded-xl border border-border">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> {item.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Footprints className="w-3.5 h-3.5 text-amber-400" /> {item.walkingTimeMins} mins walk
                </span>
              </div>

              {/* Checklist items */}
              {item.checklist && item.checklist.length > 0 && (
                <div className="mt-3 space-y-1.5 pt-2 border-t border-border">
                  {item.checklist.map((check, idx) => (
                    <button
                      key={check.id}
                      onClick={() => onToggleChecklist(item.id, idx)}
                      className="w-full flex items-center justify-between p-2 rounded-lg bg-secondary/40 hover:bg-secondary border border-border text-left text-xs transition"
                    >
                      <span className={check.completed ? 'line-through text-muted-foreground' : 'text-foreground font-medium'}>
                        {check.text}
                      </span>
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          check.completed ? 'text-emerald-400' : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
