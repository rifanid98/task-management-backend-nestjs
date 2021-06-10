import { IsIn, IsOptional, IsString } from 'class-validator';
import { Status } from '../tasks.model';

export class TaskFilterDto {
  @IsOptional()
  @IsIn([...Object.keys(Status)])
  status?: Status;

  @IsOptional()
  @IsString()
  search?: string;
}
