'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Upload, 
  Video, 
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import type { Subject } from '@/lib/types';
import { youtubeFixture } from '@/fixtures';

interface SubjectDetailProps {
  subject: Subject;
  onBack: () => void;
}

export function SubjectDetail({ subject, onBack }: SubjectDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'pyqs' | 'youtube'>('overview');

  return (
    <div className="space-y-6 pb-24 pt-16 max-w-4xl mx-auto">
      {/* Back Button & Header */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Subjects</span>
      </button>

      <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-xs text-primary font-bold">{subject.code} • {subject.credits} Credits</span>
            <h1 className="text-2xl font-black text-foreground">{subject.name}</h1>
            <p className="text-xs text-muted-foreground">Instructor: {subject.professor} • Classrooms: {subject.roomNo}</p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <div className="bg-secondary p-3 rounded-2xl border border-border text-center">
              <span className="text-muted-foreground block text-[10px]">PROGRESS</span>
              <strong className="text-emerald-400 text-sm">{subject.completionPercent}%</strong>
            </div>
            <div className="bg-secondary p-3 rounded-2xl border border-border text-center">
              <span className="text-muted-foreground block text-[10px]">REMAINING</span>
              <strong className="text-foreground text-sm">{subject.remainingLectures} Lectures</strong>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border text-xs">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'modules', label: 'Modules & Syllabus' },
            { id: 'pyqs', label: 'PYQs & Exam Prep' },
            { id: 'youtube', label: '📹 YouTube Feynman Teaching' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl border font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4 text-xs">
          <h3 className="font-bold text-sm text-foreground">Course Summary & Key Formulas</h3>
          <p className="text-muted-foreground">
            Complete syllabus coverage for End-Sem examinations. Focus heavily on Module 1 & Module 2 PYQ derivations.
          </p>
        </div>
      )}

      {/* TAB: YOUTUBE TEACHING (FEYNMAN TECHNIQUE) */}
      {activeTab === 'youtube' && (
        <div className="bg-card border border-border p-6 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-500" />
                YouTube Teaching Module (Feynman Learning Technique)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Teaching a topic on YouTube is the ultimate proof of mastery for Google & CS 9+ CGPA.
              </p>
            </div>
            <span className="text-xs bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full border border-rose-500/30 font-mono font-bold">
              LEARN BY TEACHING
            </span>
          </div>

          <div className="space-y-4">
            {youtubeFixture.filter(yt => yt.subjectCode === subject.code || true).map(yt => (
              <div key={yt.id} className="p-4 rounded-2xl bg-secondary/50 border border-border space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">{yt.topicTitle}</span>
                  <span className="text-[10px] bg-primary/20 text-primary font-mono px-2.5 py-0.5 rounded-full border border-primary/30 font-bold">
                    STATUS: {yt.status}
                  </span>
                </div>

                <p className="text-muted-foreground font-mono bg-card p-3 rounded-xl border border-border">
                  💡 {yt.notes}
                </p>

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={() => alert('Starting YouTube webcam recording...')}
                    className="flex-1 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-black font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-4 h-4" /> Record Teaching Video
                  </button>
                  <button
                    onClick={() => alert('Upload video to YouTube...')}
                    className="flex-1 py-2 rounded-xl bg-secondary border border-border text-foreground font-semibold hover:bg-card transition flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-4 h-4" /> Log Uploaded Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: MODULES */}
      {activeTab === 'modules' && (
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-sm text-foreground">Syllabus Modules</h3>
          <p className="text-xs text-muted-foreground">Modules 1-5 structured breakdown.</p>
        </div>
      )}
    </div>
  );
}
