export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export type ViewMode = "LIST" | "ADD" | "EDIT";

export type FilterStatus = 'ALL' | 'COMPLETED' | 'INCOMPLETE';

export interface AppState {
  tasks: Task[];
  viewMode: ViewMode;
  editingTask: Task | null;
  searchQuery: string;
  statusFilter: FilterStatus;
}

export const TaskStatus = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
