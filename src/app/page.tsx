'use client';

import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, initializeSeedData } from '@/lib/db';
import { calculateCurrentDecision } from '@/lib/decision-engine';

// Overhauled Mission Control Components
import { MissionControl } from '@/components/home/mission-control';
import { TodayStream } from '@/components/today/today-stream';
import { TimelineView } from '@/components/timeline/timeline-view';
import { SubjectsList } from '@/components/subjects/subjects-list';
import { SubjectDetail } from '@/components/subjects/subject-detail';
import { DSAInterviewOS } from '@/components/dsa/dsa-interview-os';
import { UnifiedHealthView } from '@/components/health/unified-health-view';
import { SettingsView } from '@/components/settings/settings-view';
import { BottomDock } from '@/components/navigation/bottom-dock';
import { CommandPalette } from '@/components/command/command-palette';
import { RecoveryModal } from '@/components/modals/recovery-modal';
import type { Subject } from '@/lib/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);

  useEffect(() => {
    initializeSeedData().catch(console.error);
  }, []);

  // Dexie IndexedDB Live State Queries
  const timeline = useLiveQuery(() => db.timeline.toArray()) || [];
  const subjects = useLiveQuery(() => db.subjects.toArray()) || [];
  const dsaProblems = useLiveQuery(() => db.dsaProblems.toArray()) || [];
  const calisthenics = useLiveQuery(() => db.calisthenics.toArray()) || [];
  const supplements = useLiveQuery(() => db.supplements.toArray()) || [];

  // Compute Decision State
  const decision = calculateCurrentDecision(timeline);

  // Handlers
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

  const handleToggleSolveDSA = async (id: string) => {
    const prob = await db.dsaProblems.get(id);
    if (!prob) return;
    await db.dsaProblems.update(id, { solved: !prob.solved, solvedDate: new Date().toISOString().split('T')[0] });
  };

  const handleToggleCalisthenics = async (id: string) => {
    const ex = await db.calisthenics.get(id);
    if (!ex) return;
    await db.calisthenics.update(id, { completedToday: !ex.completedToday });
  };

  const handleToggleSupplement = async (id: string) => {
    const sup = await db.supplements.get(id);
    if (!sup) return;
    await db.supplements.update(id, { completedToday: !sup.completedToday });
  };

  const handleLogWater = async (amount: number) => {
    const sup = await db.supplements.get('sup-5');
    if (sup) {
      await db.supplements.update('sup-5', { completedToday: true });
    }
  };

  const handleConfirmRecovery = async () => {
    const allTimeline = await db.timeline.toArray();
    for (const item of allTimeline) {
      if (item.status === 'missed') {
        await db.timeline.update(item.id, { status: 'upcoming' });
      }
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans antialiased relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {activeTab === 'home' && (
          <MissionControl
            decision={decision}
            onNavigateTab={setActiveTab}
            onOpenRecovery={() => setIsRecoveryOpen(true)}
          />
        )}

        {activeTab === 'today' && (
          <TodayStream
            timeline={timeline}
            onToggleChecklist={handleToggleChecklist}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineView
            timeline={timeline}
            onToggleChecklist={handleToggleChecklist}
            onRescheduleMissed={handleRescheduleMissed}
          />
        )}

        {activeTab === 'subjects' && (
          selectedSubject ? (
            <SubjectDetail
              subject={selectedSubject}
              onBack={() => setSelectedSubject(null)}
            />
          ) : (
            <SubjectsList
              onSelectSubject={(subj) => setSelectedSubject(subj)}
            />
          )
        )}

        {activeTab === 'dsa' && (
          <DSAInterviewOS
            problems={dsaProblems}
            onToggleSolve={handleToggleSolveDSA}
          />
        )}

        {activeTab === 'health' && (
          <UnifiedHealthView
            supplements={supplements}
            calisthenics={calisthenics}
            onToggleSupplement={handleToggleSupplement}
            onToggleCalisthenics={handleToggleCalisthenics}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView />
        )}
      </div>

      {/* Clean Bottom Navigation Dock with Tooltips */}
      <BottomDock
        activeTab={activeTab}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'subjects') setSelectedSubject(null);
        }}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Linear Style Command Palette (⌘K) */}
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'subjects') setSelectedSubject(null);
        }}
        onOpenRecovery={() => setIsRecoveryOpen(true)}
        onLogWater={handleLogWater}
      />

      {/* Recovery Modal ("I'm Behind") */}
      <RecoveryModal
        isOpen={isRecoveryOpen}
        onClose={() => setIsRecoveryOpen(false)}
        onConfirmRecovery={handleConfirmRecovery}
      />
    </main>
  );
}
