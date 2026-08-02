'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, 
  ChevronRight, 
  BookOpen, 
  FileText, 
  Video, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import type { Subject } from '@/lib/types';
import { subjectsFixture } from '@/fixtures';

interface SubjectsListProps {
  onSelectSubject: (subject: Subject) => void;
}

export function SubjectsList({ onSelectSubject }: SubjectsListProps) {
  return (
    <div className="space-y-6 pb-24 pt-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-black text-foreground">Apple Files Style Subjects Browser</h1>
        <p className="text-xs text-muted-foreground mt-1">
          BIT Mesra CSE 5th Semester • Course Syllabus, PYQs, Revision & YouTube Teaching.
        </p>
      </div>

      {/* Apple Files Style Subject Rows List */}
      <div className="space-y-3">
        {subjectsFixture.map((subj) => (
          <div
            key={subj.id}
            onClick={() => onSelectSubject(subj as Subject)}
            className="p-5 rounded-2xl bg-card border border-border hover:border-primary/40 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3.5 bg-secondary rounded-2xl border border-border group-hover:scale-105 transition">
                <Folder className="w-6 h-6 text-primary" />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-primary">{subj.code}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">({subj.credits} Credits)</span>
                </div>
                <h3 className="text-base font-bold text-foreground">{subj.name}</h3>
                <p className="text-xs text-muted-foreground">Faculty: {subj.professor} • {subj.roomNo}</p>
              </div>
            </div>

            {/* Metrics & Chevron */}
            <div className="flex items-center space-x-6 text-xs text-right">
              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">COMPLETION</span>
                <strong className="text-emerald-400 font-mono text-sm">{subj.completionPercent}%</strong>
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">LECTURES REMAINING</span>
                <strong className="text-foreground font-mono text-sm">{subj.remainingLectures} left</strong>
              </div>

              <div>
                <span className="text-muted-foreground block text-[10px] uppercase font-bold">REVIEW DATE</span>
                <strong className="text-amber-400 font-mono text-xs">{subj.reviewDate}</strong>
              </div>

              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
