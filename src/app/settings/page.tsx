'use client';

import { useState } from 'react';
import { SettingsView } from '@/components/settings/settings-view';
import { BottomDock } from '@/components/navigation/bottom-dock';
import { CommandPalette } from '@/components/command/command-palette';
import { RecoveryModal } from '@/components/modals/recovery-modal';

export default function SettingsPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SettingsView />
      </div>

      <BottomDock
        activeTab="settings"
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
