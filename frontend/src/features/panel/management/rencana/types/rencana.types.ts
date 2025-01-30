import { z } from 'zod';

// Enums for Type Safety
export enum TaskStatus {
  NotStarted = 'NOT_STARTED',
  InProgress = 'IN_PROGRESS',
  Blocked = 'BLOCKED',
  UnderReview = 'UNDER_REVIEW',
  Completed = 'COMPLETED'
}

export enum TaskPriority {
  Low = 'LOW',
  Medium = 'MEDIUM', 
  High = 'HIGH',
  Critical = 'CRITICAL'
}

// Validation Schemas
export const LabelSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string()
});

export const ChecklistItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean(),
  assignee: z.string().optional()
});

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  author: z.string(),
  createdAt: z.date()
});

export const AttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
  uploadedBy: z.string(),
  uploadedAt: z.date()
});

export const TaskSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  columnId: z.string(),
  
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  
  ministry: z.string().optional(),
  spiritualGoal: z.string().optional(),
  
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  
  createdAt: z.date(),
  updatedAt: z.date(),
  startDate: z.date().optional(),
  dueDate: z.date().optional(),
  completedAt: z.date().optional(),
  
  creator: z.object({
    id: z.string(),
    name: z.string()
  }),
  
  assignees: z.array(z.object({
    id: z.string(),
    name: z.string()
  })).optional(),
  
  checklist: z.array(ChecklistItemSchema).optional(),
  comments: z.array(CommentSchema).optional(),
  attachments: z.array(AttachmentSchema).optional(),
  
  relatedTasks: z.array(z.string()).optional(),
  parentTaskId: z.string().optional()
});

export const ColumnSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  title: z.string(),
  order: z.number(),
  
  limits: z.object({
    maxTasks: z.number().optional(),
    assigneeTypes: z.array(z.string()).optional()
  }).optional(),
  
  color: z.string().optional(),
  icon: z.string().optional(),
  
  taskCount: z.number(),
  averageCompletionTime: z.number().optional()
});

export const BoardSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  
  ministry: z.string().optional(),
  department: z.string().optional(),
  
  owner: z.object({
    id: z.string(),
    name: z.string()
  }),
  
  access: z.object({
    view: z.array(z.string()),
    edit: z.array(z.string()),
    manage: z.array(z.string())
  }),
  
  columns: z.array(ColumnSchema),
  
  createdAt: z.date(),
  updatedAt: z.date(),
  archivedAt: z.date().optional(),
  
  taskCount: z.number(),
  completedTaskCount: z.number(),
  
  visibility: z.enum(['private', 'team', 'church', 'public'])
});

// Type Exports
export type Label = z.infer<typeof LabelSchema>;
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type Attachment = z.infer<typeof AttachmentSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type Column = z.infer<typeof ColumnSchema>;
export type Board = z.infer<typeof BoardSchema>;
