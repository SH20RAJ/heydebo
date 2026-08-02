'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  Award, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import type { Subject } from '@/lib/types';
import confetti from 'canvas-confetti';

interface SubjectsViewProps {
  subjects: Subject[];
  onToggleTopic: (subjectId: string, moduleId: string, topicId: string) => void;
  onTogglePYQ: (subjectId: string, pyqId: string) => void;
}

export function SubjectsView({ subjects, onToggleTopic, onTogglePYQ }: SubjectsViewProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'subj-1');

  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];

  const handleTopicClick = (subjId: string, modId: string, topId: string) => {
    onToggleTopic(subjId, modId, topId);
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.7 },
      colors: [currentSubject.color, '#00F0FF', '#30D158']
    });
  };

  return (
    <div className="space-y-6 pb-24 pt-16">
      {/* Subject Header & Grid Switcher */}
      <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Target 9.5+ CGPA Academic Engine</span>
            </div>
            <h1 className="text-3xl font-black text-white">CS Semester Subjects</h1>
            <p className="text-xs text-zinc-400 mt-1">Syllabus modules, PYQs, attendance safeguards, and weak topics.</p>
          </div>

          {/* CGPA Predictor Widget */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 p-4 rounded-2xl flex items-center space-x-4">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <div>
              <div className="text-xs text-zinc-300 font-medium">PREDICTED CGPA</div>
              <div className="text-2xl font-black font-mono text-emerald-400">9.42 / 10</div>
            </div>
          </div>
        </div>

        {/* Subjects Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {subjects.map(subj => (
            <button
              key={subj.id}
              onClick={() => setSelectedSubjectId(subj.id)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                selectedSubjectId === subj.id
                  ? 'bg-white/15 border-white/40 ring-1 ring-white/30 text-white'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white">{subj.code}</span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: subj.color }} />
              </div>
              <span className="text-[11px] font-semibold truncate text-zinc-200">{subj.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Subject Dashboard Details */}
      {currentSubject && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Column: Modules & Topics (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentSubject.color }} />
                    {currentSubject.name} ({currentSubject.code})
                  </h2>
                  <p className="text-xs text-zinc-400">Instructor: {currentSubject.professor}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-cyan-300 block">
                    Target Grade: {currentSubject.targetGrade}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">Exam: {currentSubject.examDate}</span>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-6">
                {currentSubject.modules.map(mod => (
                  <div key={mod.id} className="bg-black/30 border border-white/5 p-4 rounded-2xl space-y-3">
                    <h3 className="font-bold text-sm text-white flex items-center justify-between">
                      <span>Module {mod.moduleNumber}: {mod.title}</span>
                      <span className="text-xs font-mono text-zinc-400">
                        {mod.topics.filter(t => t.completed).length} / {mod.topics.length} Done
                      </span>
                    </h3>

                    <div className="space-y-2">
                      {mod.topics.map(topic => (
                        <button
                          key={topic.id}
                          onClick={() => handleTopicClick(currentSubject.id, mod.id, topic.id)}
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition text-left text-xs"
                        >
                          <div className="flex items-center space-x-2">
                            {topic.isWeakTopic && (
                              <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                                WEAK TOPIC
                              </span>
                            )}
                            <span className={topic.completed ? 'line-through text-zinc-500 font-medium' : 'text-zinc-200 font-semibold'}>
                              {topic.title}
                            </span>
                          </div>

                          <CheckCircle2
                            className={`w-4 h-4 shrink-0 ${
                              topic.completed ? 'text-emerald-400 fill-emerald-400/20' : 'text-zinc-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Attendance & PYQs (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Attendance Safeguard Card */}
            <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Attendance Safeguard</h3>
                <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded-full ${
                  currentSubject.attendance >= 85 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {currentSubject.attendance}%
                </span>
              </div>

              <div className="space-y-1 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Attended Lectures:</span>
                  <strong className="text-white font-mono">{currentSubject.attendedLectures} / {currentSubject.totalLectures}</strong>
                </div>
                <p className="text-[11px] text-zinc-400 pt-2 border-t border-white/10">
                  {currentSubject.attendance >= 75 
                    ? '✅ Attendance safe. You can miss 2 more classes without debarment.'
                    : '⚠️ CRITICAL ATTENDANCE WARNING! Attend all next 5 lectures.'}
                </p>
              </div>
            </div>

            {/* PYQs Repository */}
            <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Previous Year Questions</span>
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
              </h3>

              <div className="space-y-3">
                {currentSubject.pyqs.map(pyq => (
                  <div key={pyq.id} className="p-3 bg-black/40 border border-white/5 rounded-2xl space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-cyan-400 font-bold">{pyq.year} End-Sem</span>
                      <span className="text-amber-400 font-bold">{pyq.marks} Marks</span>
                    </div>

                    <p className="text-zinc-200 font-medium">{pyq.question}</p>

                    <button
                      onClick={() => onTogglePYQ(currentSubject.id, pyq.id)}
                      className={`w-full text-center py-1.5 rounded-xl border text-[11px] font-semibold transition ${
                        pyq.solved
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {pyq.solved ? '✓ PYQ Solved' : 'Mark PYQ Solved'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
