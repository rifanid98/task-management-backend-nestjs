export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}

export type Status = 'OPEN' | 'IN_PROGRESS' | 'DONE';
