'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Zap, 
  Backpack,
  AlertCircle
} from 'lucide-react';
import type { TimelineActivity } from '@/lib/types';

interface TimelineViewProps {
  timeline: TimelineActivity[];
  onToggleChecklist: (activityId: string, itemIdx: number) => void;
  onRescheduleMissed: (activityId: string) => void;
}

export function TimelineView({ timeline, onToggleChecklist, onRescheduleMissed }: TimelineViewProps) {
  const [expanded, setExpanded] = useState(false);

  const activeTask = timeline.find(t => t.status === 'active') || timeline[0];

  return (
    <div className="space-y-6 pb-24 pt-16 max-w-3xl mx-auto">
      <div className="border-b border-border pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-foreground">Timeline OS</h1>
          <p className="text-xs text-muted-foreground">Current active mission highlighted. Rest collapsible.</p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full border border-primary/30 transition flex items-center gap-1 font-semibold"
        >
          <span>{expanded ? 'Collapse Upcoming' : 'Expand All Timeline'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 2X ENLARGED CURRENT ACTIVE CARD */}
      {activeTask && (
        <motion.div 
          layout
          className="bg-card border-2 border-primary p-8 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden ring-2 ring-primary/20"
        >
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 bg-primary/20 text-primary text-xs font-mono font-bold rounded-full border border-primary/40 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
              ACTIVE CURRENT TASK (2X ENLARGED)
            </span>
            <span className="text-xs font-mono font-bold text-foreground bg-secondary px-3 py-1 rounded-xl">
              {activeTask.startTime} - {activeTask.endTime}
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">{activeTask.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{activeTask.purpose}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-secondary/50 p-4 rounded-2xl border border-border text-xs">
            <div>
              <span className="text-muted-foreground block text-[10px] uppercase font-bold">LOCATION</span>
              <strong className="text-foreground text-sm font-semibold flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-primary" /> {activeTask.location}
              </strong>
            </div>

            <div>
              <span className="text-muted-foreground block text-[10px] uppercase font-bold">WALK DISTANCE</span>
              <strong className="text-amber-400 text-sm font-mono font-bold mt-0.5 block">
                {activeTask.walkingTimeMins} mins walk
              </strong>
            </div>

            <div>
              <span className="text-muted-foreground block text-[10px] uppercase font-bold">ENERGY REQUIRED</span>
              <strong className="text-purple-400 text-sm font-mono font-bold mt-0.5 block">
                {activeTask.energyReq}
              </strong>
            </div>
          </div>

          {activeTask.requiredItems && activeTask.requiredItems.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <span className="text-[11px] uppercase font-bold text-muted-foreground tracking-wider">TAKE WITH YOU:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {activeTask.requiredItems.map((item, rIdx) => (
                  <span key={rIdx} className="bg-secondary px-3 py-1 rounded-xl border border-border text-foreground font-medium flex items-center gap-1.5">
                    <Backpack className="w-3.5 h-3.5 text-primary" /> {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTask.checklist && activeTask.checklist.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="text-[11px] uppercase font-bold text-muted-foreground tracking-wider">
                Checklist ({activeTask.checklist.filter(c => c.completed).length} / {activeTask.checklist.length})
              </div>
              <div className="space-y-1.5">
                {activeTask.checklist.map((check, idx) => (
                  <button
                    key={check.id}
                    onClick={() => onToggleChecklist(activeTask.id, idx)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/40 hover:bg-secondary border border-border transition text-left text-xs"
                  >
                    <span className={check.completed ? 'line-through text-muted-foreground' : 'text-foreground font-medium'}>
                      {check.text}
                    </span>
                    <CheckCircle2
                      className={`w-4 h-4 ${check.completed ? 'text-emerald-400' : 'text-muted-foreground'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* COLLAPSIBLE ACCORDION FOR REMAINING TIMELINE */}
      <div className="space-y-3 pt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground font-semibold hover:bg-secondary transition"
        >
          <span>Other Timeline Tasks ({timeline.length - 1} items)</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 overflow-hidden"
            >
              {timeline.filter(t => t.id !== activeTask?.id).map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-card border border-border text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-muted-foreground font-bold">{item.startTime} - {item.endTime}</span>
                    <span className="text-[10px] uppercase font-bold text-primary">{item.category}</span>
                  </div>
                  <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                  <div className="flex items-center space-x-3 text-muted-foreground text-[11px]">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> {item.location}</span>
                    <span>•</span>
                    <span>{item.walkingTimeMins}m walk</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
