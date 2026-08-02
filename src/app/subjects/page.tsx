'use client';

import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, initializeSeedData } from '@/lib/db';
import { SubjectsList } from '@/components/subjects/subjects-list';
import { SubjectDetail } from '@/components/subjects/subject-detail';
import { BottomDock } from '@/components/navigation/bottom-dock';
import { CommandPalette } from '@/components/command/command-palette';
import { RecoveryModal } from '@/components/modals/recovery-modal';
import type { Subject } from '@/lib/types';

export default function SubjectsPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);

  useEffect(() => {
    initializeSeedData().catch(console.error);
  }, []);

  const subjects = useLiveQuery(() => db.subjects.toArray()) || [];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {selectedSubject ? (
          <SubjectDetail
            subject={selectedSubject}
            onBack={() => setSelectedSubject(null)}
          />
        ) : (
          <SubjectsList
            onSelectSubject={(subj) => setSelectedSubject(subj)}
          />
        )}
      </div>

      <BottomDock
        activeTab="subjects"
        onNavigateTab={(tab) => {
          if (tab === 'home') window.location.href = '/';
          else if (tab === 'today') window.location.href = '/today';
          else if (tab === 'timeline') window.location.href = '/timeline';
          else if (tab === 'subjects') window.location.href = '/subjects';
          else if (tab === 'dsa') window.location.href = '/dsa';
          else if (tab === 'health') window.location.href = '/health';
          else if (tab === 'settings') window.location.href = '/settings';
          else if (tab === 'tools') window.location.href = '/tools';
        }}
        onOpenCommandPalette={() => setCommandOpen(true)}
      />

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onNavigateTab={(tab) => {
          if (tab === 'home') window.location.href = '/';
          else if (tab === 'today') window.location.href = '/today';
          else if (tab === 'timeline') window.location.href = '/timeline';
          else if (tab === 'subjects') window.location.href = '/subjects';
          else if (tab === 'dsa') window.location.href = '/dsa';
          else if (tab === 'health') window.location.href = '/health';
          else if (tab === 'settings') window.location.href = '/settings';
          else if (tab === 'tools') window.location.href = '/tools';
        }}
        onOpenRecovery={() => setRecoveryOpen(true)}
        onLogWater={() => {}}
      />

      <RecoveryModal
        isOpen={recoveryOpen}
        onClose={() => setRecoveryOpen(false)}
        onConfirmRecovery={() => {}}
      />
    </main>
  );
}
