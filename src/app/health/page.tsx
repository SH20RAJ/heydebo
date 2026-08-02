'use client';

import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, initializeSeedData } from '@/lib/db';
import { UnifiedHealthView } from '@/components/health/unified-health-view';
import { BottomDock } from '@/components/navigation/bottom-dock';
import { CommandPalette } from '@/components/command/command-palette';
import { RecoveryModal } from '@/components/modals/recovery-modal';

export default function HealthPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);

  useEffect(() => {
    initializeSeedData().catch(console.error);
  }, []);

  const calisthenics = useLiveQuery(() => db.calisthenics.toArray()) || [];
  const supplements = useLiveQuery(() => db.supplements.toArray()) || [];

  const handleToggleSupplement = async (id: string) => {
    const sup = await db.supplements.get(id);
    if (!sup) return;
    await db.supplements.update(id, { completedToday: !sup.completedToday });
  };

  const handleToggleCalisthenics = async (id: string) => {
    const ex = await db.calisthenics.get(id);
    if (!ex) return;
    await db.calisthenics.update(id, { completedToday: !ex.completedToday });
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <UnifiedHealthView
          supplements={supplements}
          calisthenics={calisthenics}
          onToggleSupplement={handleToggleSupplement}
          onToggleCalisthenics={handleToggleCalisthenics}
        />
      </div>

      <BottomDock
        activeTab="health"
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
