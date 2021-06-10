import { Status } from '../tasks.model';

export class TaskFilterDto {
  status?: Status;
  search?: string;
}
