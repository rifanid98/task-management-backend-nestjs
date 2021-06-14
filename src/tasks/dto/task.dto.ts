import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from '../types/tasks-status';

export class TaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsIn([...Object.keys(Status)])
  status: Status;
}
