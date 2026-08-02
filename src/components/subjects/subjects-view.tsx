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
  Grid,
  Layers,
  MapPin,
  Clock,
  UserCheck
} from 'lucide-react';
import type { Subject } from '@/lib/types';
import confetti from 'canvas-confetti';

interface SubjectsViewProps {
  subjects: Subject[];
  onToggleTopic: (subjectId: string, moduleId: string, topicId: string) => void;
  onTogglePYQ: (subjectId: string, pyqId: string) => void;
}

export function SubjectsView({ subjects, onToggleTopic, onTogglePYQ }: SubjectsViewProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'subj-dccn');
  const [viewMode, setViewMode] = useState<'subjects' | 'routine'>('routine');

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

  // BIT Mesra Monsoon 2026 Timetable Matrix Data
  const routineTable = [
    {
      day: 'Monday',
      periods: [
        { time: '08:00 - 12:50', slot: 'Free / Self Study / DSA', room: 'Library' },
        { time: '12:50 - 13:30', slot: 'LUNCH BREAK', room: 'Mess' },
        { time: '13:30 - 14:20', slot: 'NLP / SE', room: 'Room G3 / G2' },
        { time: '14:30 - 15:20', slot: 'AI', room: 'Room G3' },
        { time: '15:30 - 16:20', slot: 'DMCT', room: 'Room G3' },
        { time: '16:30 - 17:20', slot: 'DCCN', room: 'Room G3' },
      ]
    },
    {
      day: 'Tuesday',
      periods: [
        { time: '09:00 - 09:50', slot: 'AI', room: 'Room 220' },
        { time: '10:00 - 10:50', slot: 'DMCT', room: 'Room 220' },
        { time: '11:00 - 11:50', slot: 'CD (Compiler)', room: 'Room 220' },
        { time: '12:00 - 12:50', slot: 'SE (Software Engg)', room: 'Room 220' },
        { time: '12:50 - 13:30', slot: 'LUNCH BREAK', room: 'Mess' },
        { time: '14:30 - 17:20', slot: 'AI Lab (CS24308)', room: 'Lab 4' },
      ]
    },
    {
      day: 'Wednesday',
      periods: [
        { time: '10:00 - 10:50', slot: 'DCCN', room: 'Room 220' },
        { time: '11:00 - 11:50', slot: 'DMCT', room: 'Room 220' },
        { time: '12:00 - 12:50', slot: 'CD (Compiler)', room: 'Room 220' },
        { time: '12:50 - 13:30', slot: 'LUNCH BREAK', room: 'Mess' },
        { time: '13:30 - 17:20', slot: 'Self Study / LeetCode Hard', room: 'Library' },
      ]
    },
    {
      day: 'Thursday',
      periods: [
        { time: '10:00 - 11:50', slot: 'CD Lab (CS24302)', room: 'Lab 1' },
        { time: '12:50 - 13:30', slot: 'LUNCH BREAK', room: 'Mess' },
        { time: '13:30 - 14:20', slot: 'CD (Compiler)', room: 'Room 214' },
        { time: '14:30 - 15:20', slot: 'AI', room: 'Room 214' },
        { time: '15:30 - 16:20', slot: 'NLP / SE', room: 'Room 214 / 220' },
        { time: '16:30 - 17:20', slot: 'DCCN', room: 'Room 220' },
      ]
    },
    {
      day: 'Friday',
      periods: [
        { time: '09:00 - 09:50', slot: 'NLP', room: 'Room 220' },
        { time: '10:00 - 11:50', slot: 'DCCN Lab (CS24306)', room: 'Lab 4' },
        { time: '12:50 - 13:30', slot: 'LUNCH BREAK', room: 'Mess' },
        { time: '13:30 - 17:20', slot: 'Self Study / Library', room: 'Library' },
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-24 pt-16">
      {/* Subject Header & View Switcher */}
      <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1">
              <BookOpen className="w-4 h-4" />
              <span>BIT Mesra B.Tech CSE Semester V (Monsoon 2026)</span>
            </div>
            <h1 className="text-3xl font-black text-white">Academic OS & Class Routine</h1>
            <p className="text-xs text-zinc-400 mt-1">Official BIT Mesra timetable, course codes, credits, and syllabus trackers.</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Mode Switcher */}
            <div className="bg-white/5 border border-white/10 p-1 rounded-2xl flex items-center space-x-1">
              <button
                onClick={() => setViewMode('routine')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'routine' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Official Routine
              </button>
              <button
                onClick={() => setViewMode('subjects')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'subjects' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Subject Dashboards
              </button>
            </div>

            {/* CGPA Predictor */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 p-3 rounded-2xl flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-[10px] text-zinc-300 font-medium">TARGET CGPA</div>
                <div className="text-xl font-black font-mono text-emerald-400">9.42 / 10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {subjects.map(subj => (
            <button
              key={subj.id}
              onClick={() => { setSelectedSubjectId(subj.id); setViewMode('subjects'); }}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between space-y-1.5 ${
                selectedSubjectId === subj.id && viewMode === 'subjects'
                  ? 'bg-white/15 border-white/40 ring-1 ring-white/30 text-white'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white">{subj.code}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: subj.color }} />
              </div>
              <span className="text-[11px] font-semibold truncate text-zinc-200">{subj.name}</span>
              <span className="text-[9px] text-zinc-400 font-mono">{subj.credits} Credits</span>
            </button>
          ))}
        </div>
      </div>

      {/* VIEW MODE 1: OFFICIAL BIT MESRA ROUTINE MATRIX */}
      {viewMode === 'routine' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  BIT Mesra Monsoon 2026 Timetable Matrix
                </h2>
                <p className="text-xs text-zinc-400">Department of CSE • B.Tech CS • Semester V C (w.e.f. 27.07.2026)</p>
              </div>

              <span className="text-xs bg-cyan-500/20 text-cyan-300 font-mono px-3 py-1 rounded-full border border-cyan-500/40">
                OE II Excluded
              </span>
            </div>

            {/* Timetable Days */}
            <div className="space-y-4">
              {routineTable.map((row) => (
                <div key={row.day} className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-3">
                  <h3 className="font-bold text-sm text-cyan-300 uppercase tracking-wider font-mono border-b border-white/10 pb-2">
                    📅 {row.day}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {row.periods.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        className={`p-3 rounded-xl border text-xs space-y-1 ${
                          p.slot.includes('Lab')
                            ? 'bg-purple-950/40 border-purple-500/40 text-purple-200'
                            : p.slot.includes('LUNCH')
                            ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                            : p.slot.includes('Free') || p.slot.includes('Self')
                            ? 'bg-white/5 border-white/5 text-zinc-400'
                            : 'bg-cyan-950/30 border-cyan-500/30 text-cyan-100'
                        }`}
                      >
                        <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                          <span>{p.time}</span>
                        </div>
                        <div className="font-bold text-white truncate">{p.slot}</div>
                        <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" /> {p.room}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Course Faculty & Credits Table */}
          <div className="bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              BIT Mesra Registered Course Faculty & Credit Distribution
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] font-mono">
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3">Course Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Credits</th>
                    <th className="py-2.5 px-3">Faculty / Instructor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">CS24305</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Data Communication & Computer Networks (DCCN)</td>
                    <td className="py-2.5 px-3">PC</td>
                    <td className="py-2.5 px-3 font-mono">3.0</td>
                    <td className="py-2.5 px-3">Dr. Prashant Pranav</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">CS24301</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Compiler Design (CD)</td>
                    <td className="py-2.5 px-3">PC</td>
                    <td className="py-2.5 px-3 font-mono">3.0</td>
                    <td className="py-2.5 px-3">Dr. I. Mukherjee</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">CS24303</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Data Mining Concepts & Techniques (DMCT)</td>
                    <td className="py-2.5 px-3">PC</td>
                    <td className="py-2.5 px-3 font-mono">3.0</td>
                    <td className="py-2.5 px-3">Dr. Debjani Mustafi</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">CS24307</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Artificial Intelligence (AI)</td>
                    <td className="py-2.5 px-3">PC</td>
                    <td className="py-2.5 px-3 font-mono">3.0</td>
                    <td className="py-2.5 px-3">Dr. Amrita Sarkar</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">CS24351</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Natural Language Processing (NLP)</td>
                    <td className="py-2.5 px-3">PE I</td>
                    <td className="py-2.5 px-3 font-mono">3.0</td>
                    <td className="py-2.5 px-3">Dr. Aditi Panda</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">CS24353</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Software Engineering (SE)</td>
                    <td className="py-2.5 px-3">PE I</td>
                    <td className="py-2.5 px-3 font-mono">3.0</td>
                    <td className="py-2.5 px-3">Dr. S. P. Singh</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-purple-400">CS24306</td>
                    <td className="py-2.5 px-3 font-semibold text-white">DCCN Lab</td>
                    <td className="py-2.5 px-3">PC Lab</td>
                    <td className="py-2.5 px-3 font-mono">1.5</td>
                    <td className="py-2.5 px-3">Dr. Prashant Pranav, Dr. Sumit Srivastava</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-purple-400">CS24302</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Compiler Design Lab</td>
                    <td className="py-2.5 px-3">PC Lab</td>
                    <td className="py-2.5 px-3 font-mono">1.5</td>
                    <td className="py-2.5 px-3">Dr. I. Mukherjee</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono font-bold text-purple-400">CS24308</td>
                    <td className="py-2.5 px-3 font-semibold text-white">Artificial Intelligence Lab</td>
                    <td className="py-2.5 px-3">PC Lab</td>
                    <td className="py-2.5 px-3 font-mono">1.5</td>
                    <td className="py-2.5 px-3">Dr. Amrita Sarkar</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: INDIVIDUAL SUBJECT DASHBOARDS */}
      {viewMode === 'subjects' && currentSubject && (
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
                  <p className="text-xs text-zinc-400">
                    Faculty: <strong>{currentSubject.professor}</strong> • Classrooms: <strong>{currentSubject.roomNo}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-cyan-300 block">
                    Credits: {currentSubject.credits} | Grade: {currentSubject.targetGrade}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-mono">Exam: {currentSubject.examDate}</span>
                </div>
              </div>

              {/* Lab Course Highlight if applicable */}
              {currentSubject.labCourseCode && (
                <div className="bg-purple-950/30 border border-purple-500/30 p-3.5 rounded-2xl flex items-center justify-between text-xs text-purple-200">
                  <div>
                    <span className="font-bold text-purple-300">{currentSubject.labCourseCode}: {currentSubject.labName}</span>
                    <p className="text-[11px] text-zinc-400">Instructor: {currentSubject.labProfessor} • Location: {currentSubject.labRoomNo}</p>
                  </div>
                  <span className="font-mono bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/40">{currentSubject.labCredits} Credits</span>
                </div>
              )}

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
