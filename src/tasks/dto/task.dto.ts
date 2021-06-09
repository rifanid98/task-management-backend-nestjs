import { Status } from '../tasks.model';

export class TaskDto {
  title: string;
  description: string;
  status: Status;
}
