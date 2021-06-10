import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Status } from '../tasks.model';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsIn([...Object.keys(Status)])
  status: Status;
}
