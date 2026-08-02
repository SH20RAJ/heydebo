'use client';

import { useEffect } from 'react';
import { Command } from 'cmdk';
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
  Droplets,
  Settings,
  Coffee,
  CheckCircle2
} from 'lucide-react';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateTab: (tab: string) => void;
  onOpenRecovery: () => void;
  onLogWater: (amount: number) => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  onNavigateTab,
  onOpenRecovery,
  onLogWater
}: CommandPaletteProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-xl">
      <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden text-foreground">
        <Command label="Linear Command Palette">
          <div className="flex items-center px-4 border-b border-border">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <Command.Input
              placeholder="Type a command or search... (e.g. 'Log Water', 'Compiler', 'DSA')"
              className="w-full bg-transparent py-4 text-sm focus:outline-none placeholder:text-muted-foreground"
              autoFocus
            />
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 text-xs space-y-1">
            <Command.Empty className="py-6 text-center text-muted-foreground">
              No matching command found.
            </Command.Empty>

            <Command.Group heading="Navigation">
              <Command.Item
                onSelect={() => { onNavigateTab('home'); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <Compass className="w-4 h-4 mr-2 text-primary" />
                <span>Go to Home (Mission Control)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => { onNavigateTab('today'); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span>Go to Today Stream</span>
              </Command.Item>

              <Command.Item
                onSelect={() => { onNavigateTab('timeline'); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <Clock className="w-4 h-4 mr-2 text-primary" />
                <span>Open Full Timeline</span>
              </Command.Item>

              <Command.Item
                onSelect={() => { onNavigateTab('subjects'); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <BookOpen className="w-4 h-4 mr-2 text-primary" />
                <span>Open CS Subjects (Apple Files Style)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => { onNavigateTab('dsa'); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <Code2 className="w-4 h-4 mr-2 text-primary" />
                <span>Open Google DSA Interview OS</span>
              </Command.Item>

              <Command.Item
                onSelect={() => { onNavigateTab('health'); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <Pill className="w-4 h-4 mr-2 text-primary" />
                <span>Open Unified Health & Fitness</span>
              </Command.Item>

              <Command.Item
                onSelect={() => { onNavigateTab('settings'); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <Settings className="w-4 h-4 mr-2 text-primary" />
                <span>Open Settings & Academic Targets</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions">
              <Command.Item
                onSelect={() => { onOpenRecovery(); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>Emergency: I&apos;m Behind (AI Recovery)</span>
              </Command.Item>

              <Command.Item
                onSelect={() => { onLogWater(500); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <Droplets className="w-4 h-4 mr-2 text-cyan-400" />
                <span>Log +500ml Water</span>
              </Command.Item>

              <Command.Item
                onSelect={() => { onNavigateTab('health'); onOpenChange(false); }}
                className="flex items-center px-3 py-2.5 rounded-lg hover:bg-secondary cursor-pointer"
              >
                <Coffee className="w-4 h-4 mr-2 text-amber-400" />
                <span>Check Caffeine Cutoff Window (2 PM)</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="p-2 border-t border-border bg-secondary/50 text-[10px] text-muted-foreground flex justify-between">
            <span>Press <kbd className="px-1 bg-background rounded font-mono">ESC</kbd> to close</span>
            <span>Use ↑ ↓ keys to navigate</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
