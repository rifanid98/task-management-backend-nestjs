export enum Status {
  DONE = 'DONE',
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
}
export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}
