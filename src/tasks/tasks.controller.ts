import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() taskFilterDto: TaskFilterDto): Promise<Task[]> {
    return this.tasksService.getTask(taskFilterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDto: TaskDto): Promise<Task> {
    return this.tasksService.createTask(taskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() taskDto: TaskDto): Promise<Task> {
    return this.tasksService.updateTask(id, taskDto);
  }
}
