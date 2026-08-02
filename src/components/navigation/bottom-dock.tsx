'use client';

import { motion } from 'framer-motion';
import { 
  Home, 
  Calendar, 
  Clock, 
  BookOpen, 
  Code2, 
  Heart, 
  Settings, 
  Command as CommandIcon 
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BottomDockProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onOpenCommandPalette: () => void;
}

export function BottomDock({ activeTab, onNavigateTab, onOpenCommandPalette }: BottomDockProps) {
  const tabs = [
    { id: 'home', label: 'Home (Mission Control)', icon: Home },
    { id: 'today', label: 'Today Stream', icon: Calendar },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'subjects', label: 'Subjects (Apple Files)', icon: BookOpen },
    { id: 'dsa', label: 'Google DSA OS', icon: Code2 },
    { id: 'health', label: 'Health & Fitness', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto bg-card/90 backdrop-blur-2xl border border-border px-3 py-2 rounded-full shadow-2xl flex items-center space-x-1 sm:space-x-2">
        <TooltipProvider>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Tooltip key={tab.id}>
                <TooltipTrigger
                  onClick={() => onNavigateTab(tab.id)}
                  className={`p-2.5 rounded-full transition-all relative ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {isActive && (
                    <motion.div
                      layoutId="activeDockIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-foreground"
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent side="top" className="text-[11px] font-medium bg-popover text-popover-foreground border-border">
                  {tab.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

          <div className="h-4 w-px bg-border my-auto mx-1" />

          {/* ⌘K Trigger Button */}
          <Tooltip>
            <TooltipTrigger
              onClick={onOpenCommandPalette}
              className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition flex items-center gap-1 font-mono text-[11px]"
            >
              <CommandIcon className="w-4 h-4" />
              <span className="hidden sm:inline font-bold">K</span>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-[11px] font-medium">
              Command Palette (⌘K)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
