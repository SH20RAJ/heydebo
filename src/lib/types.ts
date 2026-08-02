export type ActivityCategory = 
  | 'dsa' 
  | 'subject' 
  | 'workout' 
  | 'meal' 
  | 'supplement' 
  | 'rest' 
  | 'lecture' 
  | 'library' 
  | 'sleep';

export type ActivityLocation = 
  | 'Hostel Room 304' 
  | 'Central Library (Quiet Zone)' 
  | 'CS Dept Lab 2' 
  | 'Lecture Hall B-102' 
  | 'Campus Mess' 
  | 'Outdoor Calisthenics Park' 
  | 'Campus Lake Walkway';

export type ActivityStatus = 'completed' | 'active' | 'upcoming' | 'missed';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TimelineActivity {
  id: string;
  title: string;
  startTime: string; // '06:00'
  endTime: string;   // '07:00'
  category: ActivityCategory;
  location: ActivityLocation;
  status: ActivityStatus;
  checklist: ChecklistItem[];
  requiredItems: string[];
  purpose: string;
  energyReq: 'Low' | 'Medium' | 'High' | 'Peak';
  walkingTimeMins: number;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  subjectCode?: string;
  dsaTopic?: string;
}

export interface SyllabusTopic {
  id: string;
  title: string;
  completed: boolean;
  isWeakTopic?: boolean;
}

export interface SyllabusModule {
  id: string;
  moduleNumber: number;
  title: string;
  topics: SyllabusTopic[];
}

export interface PYQItem {
  id: string;
  year: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number;
  solved: boolean;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  professor: string;
  color: string;
  modules: SyllabusModule[];
  pyqs: PYQItem[];
  examDate: string; // YYYY-MM-DD
  targetGrade: string; // 'A+'
  attendance: number; // e.g. 88
  totalLectures: number;
  attendedLectures: number;
}

export type DSADifficulty = 'Easy' | 'Medium' | 'Hard';
export type DSAPattern = 
  | 'Two Pointers' 
  | 'Sliding Window' 
  | 'Monotonic Stack' 
  | 'Dynamic Programming' 
  | 'Graph BFS/DFS' 
  | 'Trie' 
  | 'Binary Search' 
  | 'Segment Tree' 
  | 'Heap / Priority Queue';

export interface DSAProblem {
  id: string;
  title: string;
  difficulty: DSADifficulty;
  pattern: DSAPattern;
  solved: boolean;
  solvedDate?: string;
  notes?: string;
  mistakeType?: 'Off-by-one' | 'Time Limit Exceeded' | 'Edge Case Null' | 'Memory Overflow' | 'Incorrect Paradigm';
  codeSnippet?: string;
  googleFrequency: 'High' | 'Very High' | 'Top Interview Question';
  url?: string;
}

export interface DSAMistakeLog {
  id: string;
  problemTitle: string;
  date: string;
  pattern: DSAPattern;
  mistakeSummary: string;
  keyTakeaway: string;
}

export type CalisthenicsDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export interface CalisthenicsExercise {
  id: string;
  name: string;
  day: CalisthenicsDay;
  targetArea: string; // e.g., 'Upper Chest & Front Lever'
  sets: number;
  reps: string; // e.g., '8-12' or '20s Hold'
  restSeconds: number;
  notes: string;
  visualCue: string; // Icon or SVG path type
  completedToday: boolean;
}

export interface SupplementItem {
  id: string;
  name: string;
  timing: string; // e.g., '07:00 AM'
  dose: string;   // e.g., '5g Creatine Monohydrate'
  category: 'hydration' | 'caffeine' | 'creatine' | 'protein' | 'meal';
  completedToday: boolean;
  purpose: string;
}

export interface SmartNotification {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  reason: string;
  timestamp: string;
  read: boolean;
  actionDone?: boolean;
}

export interface DecisionState {
  currentActivity: TimelineActivity | null;
  nextActivity: TimelineActivity | null;
  primaryAction: string;
  secondaryAction: string;
  locationRecommendation: 'Hostel' | 'Library' | 'Gym' | 'Mess' | 'Lecture Hall';
  reasoning: string;
  isBehindSchedule: boolean;
  caffeineAllowed: boolean;
  walkingTimeText: string;
  fatigueLevel: 'Fresh' | 'Moderate' | 'High Fatigue';
}
