'use client';

import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, initializeSeedData } from '@/lib/db';
import { TimelineView } from '@/components/timeline/timeline-view';
import { BottomDock } from '@/components/navigation/bottom-dock';
import { CommandPalette } from '@/components/command/command-palette';
import { RecoveryModal } from '@/components/modals/recovery-modal';

export function TimelineViewWrapper() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);

  useEffect(() => {
    initializeSeedData().catch(console.error);
  }, []);

  const timeline = useLiveQuery(() => db.timeline.toArray()) || [];

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

  return (
    <div className="relative">
      <TimelineView
        timeline={timeline}
        onToggleChecklist={handleToggleChecklist}
        onRescheduleMissed={handleRescheduleMissed}
      />

      <BottomDock
        activeTab="timeline"
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
    </div>
  );
}
