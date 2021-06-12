import { IsIn, IsOptional, IsString } from 'class-validator';
import { Status } from '../types/tasks-status';

export class TaskFilterDto {
  @IsOptional()
  @IsIn([...Object.keys(Status)])
  status?: Status;

  @IsOptional()
  @IsString()
  search?: string;
}
