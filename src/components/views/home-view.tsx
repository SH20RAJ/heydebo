'use client';

import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, initializeSeedData } from '@/lib/db';
import { calculateCurrentDecision } from '@/lib/decision-engine';
import { MissionControl } from '@/components/home/mission-control';
import { BottomDock } from '@/components/navigation/bottom-dock';
import { CommandPalette } from '@/components/command/command-palette';
import { RecoveryModal } from '@/components/modals/recovery-modal';

export function HomeView() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);

  useEffect(() => {
    initializeSeedData().catch(console.error);
  }, []);

  const timeline = useLiveQuery(() => db.timeline.toArray()) || [];
  const decision = calculateCurrentDecision(timeline);

  const handleConfirmRecovery = async () => {
    const allTimeline = await db.timeline.toArray();
    for (const item of allTimeline) {
      if (item.status === 'missed') {
        await db.timeline.update(item.id, { status: 'upcoming' });
      }
    }
  };

  return (
    <div className="relative">
      <MissionControl
        decision={decision}
        onNavigateTab={(tab) => {
          if (tab === 'today') window.location.href = '/today';
          else if (tab === 'timeline') window.location.href = '/timeline';
          else if (tab === 'subjects') window.location.href = '/subjects';
          else if (tab === 'dsa') window.location.href = '/dsa';
          else if (tab === 'health') window.location.href = '/health';
          else if (tab === 'settings') window.location.href = '/settings';
          else if (tab === 'tools') window.location.href = '/tools';
        }}
        onOpenRecovery={() => setIsRecoveryOpen(true)}
      />

      <BottomDock
        activeTab="home"
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
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
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
        onOpenRecovery={() => setIsRecoveryOpen(true)}
        onLogWater={() => {}}
      />

      <RecoveryModal
        isOpen={isRecoveryOpen}
        onClose={() => setIsRecoveryOpen(false)}
        onConfirmRecovery={handleConfirmRecovery}
      />
    </div>
  );
}
