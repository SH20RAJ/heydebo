import Dexie, { type Table } from 'dexie';
import type { 
  TimelineActivity, 
  Subject, 
  DSAProblem, 
  DSAMistakeLog,
  CalisthenicsExercise, 
  SupplementItem, 
  SmartNotification 
} from './types';

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  category: string;
  updatedAt: string;
}

export interface FlashcardItem {
  id: string;
  subjectCode: string;
  front: string;
  back: string;
  intervalDays: number;
  nextReviewDate: string;
}

export class DeboOSDatabase extends Dexie {
  timeline!: Table<TimelineActivity, string>;
  subjects!: Table<Subject, string>;
  dsaProblems!: Table<DSAProblem, string>;
  dsaMistakes!: Table<DSAMistakeLog, string>;
  calisthenics!: Table<CalisthenicsExercise, string>;
  supplements!: Table<SupplementItem, string>;
  notifications!: Table<SmartNotification, string>;
  notes!: Table<NoteItem, string>;
  flashcards!: Table<FlashcardItem, string>;

  constructor() {
    super('DeboOSDatabase');
    this.version(1).stores({
      timeline: 'id, startTime, status, category',
      subjects: 'id, code, name',
      dsaProblems: 'id, pattern, difficulty, solved',
      dsaMistakes: 'id, date, pattern',
      calisthenics: 'id, day, completedToday',
      supplements: 'id, category, completedToday',
      notifications: 'id, timestamp, read',
      notes: 'id, category, updatedAt',
      flashcards: 'id, subjectCode, nextReviewDate'
    });
  }
}

export const db = new DeboOSDatabase();

export async function initializeSeedData() {
  const timelineCount = await db.timeline.count();
  if (timelineCount > 0) return; // Already seeded

  // Seed Timeline
  const seedTimeline: TimelineActivity[] = [
    {
      id: 't-1',
      title: 'Wake Up & Cold Hydration + Creatine',
      startTime: '06:00',
      endTime: '06:30',
      category: 'supplement',
      location: 'Hostel Room 304',
      status: 'completed',
      checklist: [
        { id: 'c1', text: '500ml Filtered Water', completed: true },
        { id: 'c2', text: '5g Creatine Monohydrate', completed: true },
        { id: 'c3', text: '10 Min Sunlight Exposure', completed: true }
      ],
      requiredItems: ['Water Bottle', 'Creatine Tub'],
      purpose: 'Cortisol spike activation & ATP cell hydration for CS focus',
      energyReq: 'Low',
      walkingTimeMins: 0,
      priority: 'High'
    },
    {
      id: 't-2',
      title: 'Google DSA Deep Work: Monotonic Stack & DP',
      startTime: '06:30',
      endTime: '08:30',
      category: 'dsa',
      location: 'Central Library (Quiet Zone)',
      status: 'completed',
      checklist: [
        { id: 'c4', text: 'Solve LC 84: Largest Rectangle in Histogram', completed: true },
        { id: 'c5', text: 'Solve LC 42: Trapping Rain Water', completed: true },
        { id: 'c6', text: 'Document off-by-one errors in Mistakes Log', completed: true }
      ],
      requiredItems: ['MacBook Pro', 'Noise-Cancelling Headphones', 'Notebook'],
      purpose: 'Google Level 4 DSA problem patterns mastery',
      energyReq: 'Peak',
      walkingTimeMins: 5,
      priority: 'Critical',
      dsaTopic: 'Monotonic Stack'
    },
    {
      id: 't-3',
      title: 'Anabolic Breakfast & Espresso Boost',
      startTime: '08:30',
      endTime: '09:15',
      category: 'meal',
      location: 'Campus Mess',
      status: 'completed',
      checklist: [
        { id: 'c7', text: '4 Boiled Eggs + Oats', completed: true },
        { id: 'c8', text: 'Single Shot Espresso', completed: true }
      ],
      requiredItems: ['Mess Pass'],
      purpose: 'Protein synthesis & caffeine window optimization',
      energyReq: 'Medium',
      walkingTimeMins: 4,
      priority: 'High'
    },
    {
      id: 't-4',
      title: 'DCCN Lecture: Sliding Window Protocols',
      startTime: '09:30',
      endTime: '11:00',
      category: 'lecture',
      location: 'Lecture Hall B-102',
      status: 'active',
      checklist: [
        { id: 'c9', text: 'Review TCP Go-Back-N vs Selective Repeat', completed: false },
        { id: 'c10', text: 'Take structured Markdown notes in HeyDebo', completed: false }
      ],
      requiredItems: ['MacBook Pro', 'DCCN Syllabus PDF'],
      purpose: 'Target 9+ CGPA & 90%+ attendance record',
      energyReq: 'High',
      walkingTimeMins: 6,
      priority: 'Critical',
      subjectCode: 'CS501'
    },
    {
      id: 't-5',
      title: 'Compiler Design Lecture: Lexical Analysis & Flex',
      startTime: '11:15',
      endTime: '12:45',
      category: 'lecture',
      location: 'CS Dept Lab 2',
      status: 'upcoming',
      checklist: [
        { id: 'c11', text: 'Implement NFA to DFA conversion code', completed: false },
        { id: 'c12', text: 'Solve Module 2 PYQ Question #3', completed: false }
      ],
      requiredItems: ['MacBook Pro', 'C Compiler Tools'],
      purpose: 'Syllabus Module 2 mastery for End-Sem Exam',
      energyReq: 'High',
      walkingTimeMins: 3,
      priority: 'Critical',
      subjectCode: 'CS502'
    },
    {
      id: 't-6',
      title: 'Lunch & Micro-Walk Hydration',
      startTime: '13:00',
      endTime: '14:00',
      category: 'meal',
      location: 'Campus Mess',
      status: 'upcoming',
      checklist: [
        { id: 'c13', text: 'Clean High-Protein Meal', completed: false },
        { id: 'c14', text: 'Drink 750ml Water', completed: false }
      ],
      requiredItems: [],
      purpose: 'Re-fuel glycogen stores for afternoon study',
      energyReq: 'Low',
      walkingTimeMins: 4,
      priority: 'Medium'
    },
    {
      id: 't-7',
      title: 'AI & Machine Learning: Neural Networks & Backprop',
      startTime: '14:15',
      endTime: '16:00',
      category: 'library',
      location: 'Central Library (Quiet Zone)',
      status: 'upcoming',
      checklist: [
        { id: 'c15', text: 'Derive Backpropagation Partial Derivatives', completed: false },
        { id: 'c16', text: 'Code PyTorch Linear Regression from scratch', completed: false }
      ],
      requiredItems: ['MacBook Pro', 'iPad Air'],
      purpose: 'Deep understanding of AI core concepts',
      energyReq: 'High',
      walkingTimeMins: 5,
      priority: 'High',
      subjectCode: 'CS503'
    },
    {
      id: 't-8',
      title: '5-Day Calisthenics: Chest & Front Lever Skills',
      startTime: '16:30',
      endTime: '18:00',
      category: 'workout',
      location: 'Outdoor Calisthenics Park',
      status: 'upcoming',
      checklist: [
        { id: 'c17', text: 'Weighted Dips: 4 sets x 10 reps (+20kg)', completed: false },
        { id: 'c18', text: 'Tuck Front Lever Holds: 5 sets x 15s', completed: false },
        { id: 'c19', text: 'Pseudo Planche Push-ups: 4 sets x 12', completed: false },
        { id: 'c20', text: 'Whey Protein Shake (30g)', completed: false }
      ],
      requiredItems: ['Gym Towel', 'Resistance Bands', 'Chalk', 'Water Bottle'],
      purpose: 'Build aesthetic athletic physique & leverage strength',
      energyReq: 'Peak',
      walkingTimeMins: 7,
      priority: 'High'
    },
    {
      id: 't-9',
      title: 'Google Contest Practice & Speed LeetCode',
      startTime: '18:30',
      endTime: '20:00',
      category: 'dsa',
      location: 'Hostel Room 304',
      status: 'upcoming',
      checklist: [
        { id: 'c21', text: 'Timed LeetCode Medium #200 (Island Count)', completed: false },
        { id: 'c22', text: 'Timed LeetCode Medium #207 (Course Schedule)', completed: false }
      ],
      requiredItems: ['MacBook Pro'],
      purpose: 'Interview speed & pattern recognition under clock pressure',
      energyReq: 'High',
      walkingTimeMins: 0,
      priority: 'High'
    },
    {
      id: 't-10',
      title: 'Dinner & Campus Relaxation Walk',
      startTime: '20:00',
      endTime: '21:00',
      category: 'meal',
      location: 'Campus Lake Walkway',
      status: 'upcoming',
      checklist: [
        { id: 'c23', text: 'Light Dinner', completed: false },
        { id: 'c24', text: '20 Min Walk without screens', completed: false }
      ],
      requiredItems: [],
      purpose: 'Lower heart rate & mental decompression',
      energyReq: 'Low',
      walkingTimeMins: 10,
      priority: 'Low'
    },
    {
      id: 't-11',
      title: 'Spaced Revision & Flashcard Review',
      startTime: '21:15',
      endTime: '22:15',
      category: 'subject',
      location: 'Hostel Room 304',
      status: 'upcoming',
      checklist: [
        { id: 'c25', text: 'Review 20 DCCN Anki Flashcards', completed: false },
        { id: 'c26', text: 'Review DMCT Graph Theory theorems', completed: false }
      ],
      requiredItems: ['MacBook Pro'],
      purpose: 'Long-term retention engine',
      energyReq: 'Medium',
      walkingTimeMins: 0,
      priority: 'High'
    },
    {
      id: 't-12',
      title: 'Sleep Wind-Down & Blue Light Block',
      startTime: '22:30',
      endTime: '23:00',
      category: 'sleep',
      location: 'Hostel Room 304',
      status: 'upcoming',
      checklist: [
        { id: 'c27', text: 'Magnesium Glycinate 400mg', completed: false },
        { id: 'c28', text: 'Journal 3 wins of today', completed: false },
        { id: 'c29', text: 'Set 06:00 AM Alarm', completed: false }
      ],
      requiredItems: [],
      purpose: 'Deep REM & Slow Wave sleep recovery',
      energyReq: 'Low',
      walkingTimeMins: 0,
      priority: 'Critical'
    }
  ];

  await db.timeline.bulkAdd(seedTimeline);

  // Seed Subjects
  const seedSubjects: Subject[] = [
    {
      id: 'subj-1',
      code: 'CS501',
      name: 'Data Communication & Computer Networks (DCCN)',
      professor: 'Dr. A. K. Sharma',
      color: '#00F0FF',
      attendance: 88,
      attendedLectures: 22,
      totalLectures: 25,
      targetGrade: 'A+',
      examDate: '2026-09-15',
      modules: [
        {
          id: 'm1',
          moduleNumber: 1,
          title: 'Physical & Data Link Layer',
          topics: [
            { id: 't1', title: 'OSI vs TCP/IP Reference Models', completed: true },
            { id: 't2', title: 'Framing, Error Detection & CRC 32', completed: true },
            { id: 't3', title: 'Sliding Window: Go-Back-N & Selective Repeat', completed: false, isWeakTopic: true }
          ]
        },
        {
          id: 'm2',
          moduleNumber: 2,
          title: 'Network Layer & Routing',
          topics: [
            { id: 't4', title: 'IPv4 & IPv6 Subnetting & CIDR', completed: true },
            { id: 't5', title: 'Dijkstra & Distance Vector Routing (RIP vs OSPF)', completed: false }
          ]
        },
        {
          id: 'm3',
          moduleNumber: 3,
          title: 'Transport Layer & TCP',
          topics: [
            { id: 't6', title: 'TCP 3-Way Handshake & Connection Teardown', completed: true },
            { id: 't7', title: 'TCP Congestion Control (Slow Start, Tahoe, Reno)', completed: false, isWeakTopic: true }
          ]
        }
      ],
      pyqs: [
        { id: 'p1', year: '2025', question: 'Derive efficiency formula for Selective Repeat ARQ with window size N.', difficulty: 'Hard', marks: 10, solved: false },
        { id: 'p2', year: '2024', question: 'Differentiate between Leaky Bucket and Token Bucket traffic shaping.', difficulty: 'Medium', marks: 5, solved: true }
      ]
    },
    {
      id: 'subj-2',
      code: 'CS502',
      name: 'Compiler Design',
      professor: 'Prof. R. Mehta',
      color: '#FF2D55',
      attendance: 92,
      attendedLectures: 23,
      totalLectures: 25,
      targetGrade: 'A+',
      examDate: '2026-09-18',
      modules: [
        {
          id: 'm4',
          moduleNumber: 1,
          title: 'Lexical Analysis & Parsing',
          topics: [
            { id: 't8', title: 'Regular Expressions to NFA / DFA conversion', completed: true },
            { id: 't9', title: 'LL(1) Parsing Table Construction & First/Follow', completed: true },
            { id: 't10', title: 'LR(0), SLR(1), LALR(1) Parsing Algorithms', completed: false, isWeakTopic: true }
          ]
        }
      ],
      pyqs: [
        { id: 'p3', year: '2025', question: 'Construct SLR(1) parsing table for grammar S -> L = R | R.', difficulty: 'Hard', marks: 12, solved: true }
      ]
    },
    {
      id: 'subj-3',
      code: 'CS503',
      name: 'Artificial Intelligence & Machine Learning',
      professor: 'Dr. S. Roy',
      color: '#30D158',
      attendance: 85,
      attendedLectures: 17,
      totalLectures: 20,
      targetGrade: 'A+',
      examDate: '2026-09-22',
      modules: [
        {
          id: 'm5',
          moduleNumber: 1,
          title: 'Search Strategies & Optimization',
          topics: [
            { id: 't11', title: 'A* Search & Admissible Heuristics', completed: true },
            { id: 't12', title: 'Alpha-Beta Pruning in Minimax Trees', completed: true }
          ]
        }
      ],
      pyqs: [
        { id: 'p4', year: '2025', question: 'Prove A* search optimality when heuristic h(n) is consistent.', difficulty: 'Medium', marks: 8, solved: true }
      ]
    },
    {
      id: 'subj-4',
      code: 'CS504',
      name: 'Discrete Math & Complexity Theory (DMCT)',
      professor: 'Prof. K. Verma',
      color: '#BF5AF2',
      attendance: 90,
      attendedLectures: 18,
      totalLectures: 20,
      targetGrade: 'A+',
      examDate: '2026-09-25',
      modules: [],
      pyqs: []
    },
    {
      id: 'subj-5',
      code: 'CS505',
      name: 'Natural Language Processing (NLP)',
      professor: 'Dr. V. Kapoor',
      color: '#FFD60A',
      attendance: 84,
      attendedLectures: 16,
      totalLectures: 19,
      targetGrade: 'A+',
      examDate: '2026-09-28',
      modules: [],
      pyqs: []
    },
    {
      id: 'subj-6',
      code: 'CS506',
      name: 'Software Engineering & System Architecture',
      professor: 'Prof. N. Sen',
      color: '#64D2FF',
      attendance: 95,
      attendedLectures: 19,
      totalLectures: 20,
      targetGrade: 'A+',
      examDate: '2026-10-02',
      modules: [],
      pyqs: []
    }
  ];

  await db.subjects.bulkAdd(seedSubjects);

  // Seed DSA Problems
  const seedDSA: DSAProblem[] = [
    { id: 'dsa-1', title: 'Largest Rectangle in Histogram', difficulty: 'Hard', pattern: 'Monotonic Stack', solved: true, solvedDate: '2026-08-03', googleFrequency: 'Top Interview Question', notes: 'Maintain non-decreasing stack of indices. On smaller element, pop and calculate area.' },
    { id: 'dsa-2', title: 'Trapping Rain Water', difficulty: 'Hard', pattern: 'Two Pointers', solved: true, solvedDate: '2026-08-03', googleFrequency: 'Top Interview Question', notes: 'Left and right pointers maintaining maxLeft and maxRight.' },
    { id: 'dsa-3', title: 'Sliding Window Maximum', difficulty: 'Hard', pattern: 'Monotonic Stack', solved: false, googleFrequency: 'Very High', mistakeType: 'Time Limit Exceeded' },
    { id: 'dsa-4', title: 'Minimum Window Substring', difficulty: 'Hard', pattern: 'Sliding Window', solved: true, solvedDate: '2026-08-02', googleFrequency: 'Top Interview Question' },
    { id: 'dsa-5', title: 'Word Break II', difficulty: 'Hard', pattern: 'Dynamic Programming', solved: false, googleFrequency: 'High' },
    { id: 'dsa-6', title: 'Course Schedule II (Topsort)', difficulty: 'Medium', pattern: 'Graph BFS/DFS', solved: true, solvedDate: '2026-08-01', googleFrequency: 'Very High' },
    { id: 'dsa-7', title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', pattern: 'Trie', solved: true, solvedDate: '2026-07-31', googleFrequency: 'Very High' },
    { id: 'dsa-8', title: 'Longest Palindromic Substring', difficulty: 'Medium', pattern: 'Dynamic Programming', solved: true, solvedDate: '2026-07-30', googleFrequency: 'High' },
    { id: 'dsa-9', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', pattern: 'Binary Search', solved: false, googleFrequency: 'Top Interview Question' }
  ];

  await db.dsaProblems.bulkAdd(seedDSA);

  // Seed Calisthenics Exercises
  const seedCalisthenics: CalisthenicsExercise[] = [
    // Monday: Chest & Front Lever
    { id: 'cal-1', name: 'Weighted Dips (+20kg)', day: 'Monday', targetArea: 'Lower Chest & Triceps', sets: 4, reps: '8-10', restSeconds: 120, notes: 'Full depth, lockout at top', visualCue: 'dips', completedToday: false },
    { id: 'cal-2', name: 'Tuck Front Lever Hold', day: 'Monday', targetArea: 'Lats & Core Stability', sets: 5, reps: '15s Hold', restSeconds: 90, notes: 'Depressed scapula, straight arms', visualCue: 'lever', completedToday: false },
    { id: 'cal-3', name: 'Pseudo Planche Push-ups', day: 'Monday', targetArea: 'Upper Chest & Shoulders', sets: 4, reps: '10-12', restSeconds: 90, notes: 'Maximum forward lean', visualCue: 'pushup', completedToday: false },

    // Tuesday: Arms & Handstand
    { id: 'cal-4', name: 'Wall Handstand Push-ups', day: 'Tuesday', targetArea: 'Deltoids & Upper Triceps', sets: 4, reps: '6-8', restSeconds: 120, notes: 'Hollow body posture', visualCue: 'handstand', completedToday: false },
    { id: 'cal-5', name: 'Chin-ups with Pause', day: 'Tuesday', targetArea: 'Biceps & Upper Back', sets: 4, reps: '10', restSeconds: 90, notes: '2s chin over bar hold', visualCue: 'chinup', completedToday: false },

    // Wednesday: Legs
    { id: 'cal-6', name: 'Pistol Squats (Single Leg)', day: 'Wednesday', targetArea: 'Quads & Glutes', sets: 4, reps: '8 each leg', restSeconds: 90, notes: 'Full depth knee tracking', visualCue: 'squat', completedToday: false },
    { id: 'cal-7', name: 'Explosive Jump Squats', day: 'Wednesday', targetArea: 'Explosive Fast-Twitch Fibers', sets: 4, reps: '15', restSeconds: 60, notes: 'Maximum vertical height', visualCue: 'jumpsquat', completedToday: false },

    // Thursday: Back & Muscle-Up
    { id: 'cal-8', name: 'Explosive High Pull-ups', day: 'Thursday', targetArea: 'Lats & Muscle-Up Transition', sets: 5, reps: '5 reps (Bar to Chest)', restSeconds: 120, notes: 'Fast pull to sternum', visualCue: 'pullup', completedToday: false },
    { id: 'cal-9', name: 'Clean Muscle-Ups', day: 'Thursday', targetArea: 'Explosive Upper Body', sets: 4, reps: '3-5', restSeconds: 150, notes: 'No kip, smooth transition', visualCue: 'muscleup', completedToday: false },

    // Friday: Abs & Skills
    { id: 'cal-10', name: 'Hanging Leg Raises', day: 'Friday', targetArea: 'Rectus Abdominis', sets: 4, reps: '12-15', restSeconds: 60, notes: 'Toes to bar, zero momentum', visualCue: 'legraise', completedToday: false },
    { id: 'cal-11', name: 'Dragon Flags', day: 'Friday', targetArea: 'Entire Core & Lat Compression', sets: 4, reps: '6-8', restSeconds: 90, notes: 'Straight body line descent', visualCue: 'dragonflag', completedToday: false }
  ];

  await db.calisthenics.bulkAdd(seedCalisthenics);

  // Seed Supplements
  const seedSupplements: SupplementItem[] = [
    { id: 'sup-1', name: 'Morning Filtered Water', timing: '06:00 AM', dose: '500ml', category: 'hydration', completedToday: true, purpose: 'Rehydrate after 7.5h sleep' },
    { id: 'sup-2', name: 'Creatine Monohydrate', timing: '06:15 AM', dose: '5g', category: 'creatine', completedToday: true, purpose: 'Brain & Muscle ATP saturation' },
    { id: 'sup-3', name: 'Pre-Study Espresso', timing: '08:30 AM', dose: '100mg Caffeine', category: 'caffeine', completedToday: true, purpose: 'Adenosine receptor blockade' },
    { id: 'sup-4', name: 'Post-Workout Whey Protein', timing: '18:00 PM', dose: '30g Protein', category: 'protein', completedToday: false, purpose: 'Muscle muscle protein synthesis' },
    { id: 'sup-5', name: 'Daily Water Goal Target', timing: 'All Day', dose: '3,500ml Total', category: 'hydration', completedToday: false, purpose: 'Optimal cognitive performance' }
  ];

  await db.supplements.bulkAdd(seedSupplements);
}
