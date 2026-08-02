'use client';

import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, initializeSeedData } from '@/lib/db';
import { DSAInterviewOS } from '@/components/dsa/dsa-interview-os';
import { BottomDock } from '@/components/navigation/bottom-dock';
import { CommandPalette } from '@/components/command/command-palette';
import { RecoveryModal } from '@/components/modals/recovery-modal';

export default function DSAPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);

  useEffect(() => {
    initializeSeedData().catch(console.error);
  }, []);

  const dsaProblems = useLiveQuery(() => db.dsaProblems.toArray()) || [];

  const handleToggleSolveDSA = async (id: string) => {
    const prob = await db.dsaProblems.get(id);
    if (!prob) return;
    await db.dsaProblems.update(id, { solved: !prob.solved, solvedDate: new Date().toISOString().split('T')[0] });
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <DSAInterviewOS
          problems={dsaProblems}
          onToggleSolve={handleToggleSolveDSA}
        />
      </div>

      <BottomDock
        activeTab="dsa"
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
