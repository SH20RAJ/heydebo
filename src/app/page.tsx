'use client';

import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Clock, 
  Code2, 
  Dumbbell, 
  BookOpen, 
  Pill, 
  Bot, 
  Sparkles, 
  AlertTriangle,
  Flame,
  Plus
} from 'lucide-react';
import { db, initializeSeedData } from '@/lib/db';
import { calculateCurrentDecision } from '@/lib/decision-engine';
import { DynamicIsland } from '@/components/ui/dynamic-island';
import { WatchDashboard } from '@/components/dashboard/watch-dashboard';
import { VerticalTimeline } from '@/components/timeline/vertical-timeline';
import { DSAView } from '@/components/dsa/dsa-view';
import { CalisthenicsView } from '@/components/gym/calisthenics-view';
import { SubjectsView } from '@/components/subjects/subjects-view';
import { HealthView } from '@/components/health/health-view';
import { DeboAIChat } from '@/components/ai/debo-ai-chat';
import { RecoveryModal } from '@/components/modals/recovery-modal';
import { QuickCaptureModal } from '@/components/modals/quick-capture-modal';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timeline' | 'dsa' | 'gym' | 'subjects' | 'health' | 'ai'>('dashboard');
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);

  // Initialize Dexie Seed Data on mount
  useEffect(() => {
    initializeSeedData().catch(console.error);
  }, []);

  // Live Queries from IndexedDB
  const timeline = useLiveQuery(() => db.timeline.toArray()) || [];
  const subjects = useLiveQuery(() => db.subjects.toArray()) || [];
  const dsaProblems = useLiveQuery(() => db.dsaProblems.toArray()) || [];
  const calisthenics = useLiveQuery(() => db.calisthenics.toArray()) || [];
  const supplements = useLiveQuery(() => db.supplements.toArray()) || [];

  // Compute Decision State
  const decision = calculateCurrentDecision(timeline);

  // Handlers for Timeline Checklist Toggle
  const handleToggleChecklist = async (activityId: string, itemIdx: number) => {
    const item = await db.timeline.get(activityId);
    if (!item) return;
    const updatedChecklist = [...item.checklist];
    updatedChecklist[itemIdx].completed = !updatedChecklist[itemIdx].completed;
    await db.timeline.update(activityId, { checklist: updatedChecklist });
  };

  const handleRescheduleMissed = async (activityId: string) => {
    await db.timeline.update(activityId, { status: 'upcoming', startTime: '19:00', endTime: '20:00' });
  };

  // Handler for DSA Solve
  const handleToggleSolveDSA = async (id: string) => {
    const prob = await db.dsaProblems.get(id);
    if (!prob) return;
    await db.dsaProblems.update(id, { solved: !prob.solved, solvedDate: new Date().toISOString().split('T')[0] });
  };

  // Handler for Calisthenics Exercise Toggle
  const handleToggleCalisthenics = async (id: string) => {
    const ex = await db.calisthenics.get(id);
    if (!ex) return;
    await db.calisthenics.update(id, { completedToday: !ex.completedToday });
  };

  // Handler for Subjects Topic Toggle
  const handleToggleSubjectTopic = async (subjId: string, modId: string, topicId: string) => {
    const subj = await db.subjects.get(subjId);
    if (!subj) return;

    const updatedModules = subj.modules.map(mod => {
      if (mod.id !== modId) return mod;
      return {
        ...mod,
        topics: mod.topics.map(top => {
          if (top.id !== topicId) return top;
          return { ...top, completed: !top.completed };
        })
      };
    });

    await db.subjects.update(subjId, { modules: updatedModules });
  };

  const handleTogglePYQ = async (subjId: string, pyqId: string) => {
    const subj = await db.subjects.get(subjId);
    if (!subj) return;

    const updatedPYQs = subj.pyqs.map(pyq => {
      if (pyq.id !== pyqId) return pyq;
      return { ...pyq, solved: !pyq.solved };
    });

    await db.subjects.update(subjId, { pyqs: updatedPYQs });
  };

  // Handler for Supplement Toggle
  const handleToggleSupplement = async (id: string) => {
    const sup = await db.supplements.get(id);
    if (!sup) return;
    await db.supplements.update(id, { completedToday: !sup.completedToday });
  };

  // Save Note Handler
  const handleSaveNote = async (title: string, content: string) => {
    await db.notes.add({
      id: Date.now().toString(),
      title,
      content,
      category: 'quick-capture',
      updatedAt: new Date().toISOString()
    });
  };

  // AI Recovery Handler
  const handleConfirmRecovery = async () => {
    // Reset missed timeline items to upcoming
    const allTimeline = await db.timeline.toArray();
    for (const item of allTimeline) {
      if (item.status === 'missed') {
        await db.timeline.update(item.id, { status: 'upcoming' });
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#090a0f] text-white selection:bg-cyan-500 selection:text-black font-sans antialiased relative">
      {/* Background ambient glow circles */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Omnipresent Dynamic Island Header */}
      <DynamicIsland
        decision={decision}
        onOpenRecovery={() => setIsRecoveryOpen(true)}
        onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
      />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Render Tab Views */}
        {activeTab === 'dashboard' && (
          <WatchDashboard
            decision={decision}
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onOpenRecovery={() => setIsRecoveryOpen(true)}
          />
        )}

        {activeTab === 'timeline' && (
          <VerticalTimeline
            timeline={timeline}
            onToggleChecklist={handleToggleChecklist}
            onRescheduleMissed={handleRescheduleMissed}
          />
        )}

        {activeTab === 'dsa' && (
          <DSAView
            problems={dsaProblems}
            onToggleSolve={handleToggleSolveDSA}
          />
        )}

        {activeTab === 'gym' && (
          <CalisthenicsView
            exercises={calisthenics}
            onToggleExercise={handleToggleCalisthenics}
          />
        )}

        {activeTab === 'subjects' && (
          <SubjectsView
            subjects={subjects}
            onToggleTopic={handleToggleSubjectTopic}
            onTogglePYQ={handleTogglePYQ}
          />
        )}

        {activeTab === 'health' && (
          <HealthView
            supplements={supplements}
            onToggleSupplement={handleToggleSupplement}
          />
        )}

        {activeTab === 'ai' && (
          <DeboAIChat decision={decision} />
        )}
      </div>

      {/* Glassmorphic Bottom Floating Navigation Bar */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4">
        <div className="bg-black/85 backdrop-blur-2xl border border-white/15 px-3 py-2 rounded-full shadow-2xl flex items-center space-x-1 sm:space-x-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Compass },
            { id: 'timeline', label: 'Timeline', icon: Clock },
            { id: 'dsa', label: 'Google DSA', icon: Code2 },
            { id: 'gym', label: 'Calisthenics', icon: Dumbbell },
            { id: 'subjects', label: 'Subjects', icon: BookOpen },
            { id: 'health', label: 'Health', icon: Pill },
            { id: 'ai', label: 'AI Coach', icon: Bot },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-full text-xs font-semibold transition ${
                  isActive
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <RecoveryModal
        isOpen={isRecoveryOpen}
        onClose={() => setIsRecoveryOpen(false)}
        onConfirmRecovery={handleConfirmRecovery}
      />

      <QuickCaptureModal
        isOpen={isQuickCaptureOpen}
        onClose={() => setIsQuickCaptureOpen(false)}
        onSaveNote={handleSaveNote}
      />
    </main>
  );
}
