import { z } from 'zod';

export const ActivityCategorySchema = z.enum([
  'dsa', 
  'subject', 
  'workout', 
  'meal', 
  'supplement', 
  'rest', 
  'lecture', 
  'lab',
  'library', 
  'sleep'
]);

export const ActivityLocationSchema = z.enum([
  'Hostel Room 304',
  'Central Library (Quiet Zone)',
  'Room 220, CSE Dept',
  'Room 214, CSE Dept',
  'Room G3, Main Building',
  'Room G2, Main Building',
  'Lab 1 (CD Lab), CSE Dept',
  'Lab 4 (AI/DCCN Lab), CSE Dept',
  'Campus Mess',
  'Outdoor Calisthenics Park',
  'Campus Lake Walkway'
]);

export const ChecklistItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean(),
});

export const TimelineActivitySchema = z.object({
  id: z.string(),
  title: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  category: ActivityCategorySchema,
  location: ActivityLocationSchema,
  status: z.enum(['completed', 'active', 'upcoming', 'missed']),
  checklist: z.array(ChecklistItemSchema),
  requiredItems: z.array(z.string()),
  purpose: z.string(),
  energyReq: z.enum(['Low', 'Medium', 'High', 'Peak']),
  walkingTimeMins: z.number(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  subjectCode: z.string().optional(),
  roomNo: z.string().optional(),
  dsaTopic: z.string().optional(),
  dayOfWeek: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']).optional(),
});

export const SubjectSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  credits: z.number(),
  professor: z.string(),
  roomNo: z.string().optional(),
  color: z.string(),
  completionPercent: z.number(),
  totalLectures: z.number(),
  remainingLectures: z.number(),
  reviewDate: z.string(),
  labCourseCode: z.string().optional(),
  labName: z.string().optional(),
  labCredits: z.number().optional(),
  labRoomNo: z.string().optional(),
  labProfessor: z.string().optional(),
});

export const YouTubeModuleSchema = z.object({
  id: z.string(),
  subjectCode: z.string(),
  topicTitle: z.string(),
  status: z.enum(['Understand', 'Record', 'Uploaded']),
  videoUrl: z.string().optional(),
  notes: z.string(),
});

export const DSATopicSchema = z.object({
  topicName: z.string(),
  problems: z.array(z.object({
    id: z.string(),
    title: z.string(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']),
    solved: z.boolean(),
  })),
  revisionDue: z.boolean(),
  weakPattern: z.boolean(),
});

export const HealthStateSchema = z.object({
  waterMl: z.number(),
  waterTargetMl: z.number(),
  sleepScore: z.number(),
  sleepHours: z.number(),
  proteinGram: z.number(),
  creatineTaken: z.boolean(),
  caffeineCutoffTime: z.string(),
  caffeineTakenMg: z.number(),
  steps: z.number(),
  mood: z.enum(['Energetic', 'Focused', 'Calm', 'Fatigued']),
});
