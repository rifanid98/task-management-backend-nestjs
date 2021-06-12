import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from '../types/tasks-status';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsIn([...Object.keys(Status)])
  status: Status;
}
