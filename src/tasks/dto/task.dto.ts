import { IsIn, IsNotEmpty } from 'class-validator';
import { Status } from '../tasks.model';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsIn([...Object.keys(Status)])
  status: Status;
}
