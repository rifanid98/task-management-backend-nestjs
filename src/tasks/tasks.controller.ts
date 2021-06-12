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
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() taskFilterDto: TaskFilterDto): Task[] {
  //   if (Object.keys(taskFilterDto).length) {
  //     return this.tasksService.getTaskWithFilter(taskFilterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // createTask(@Body() taskDto: TaskDto): Task {
  //   return this.tasksService.createTask(taskDto);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id')
  // updateTask(@Param('id') id: string, @Body() taskDto: TaskDto): Task {
  //   return this.tasksService.updateTask(id, taskDto);
  // }
}
