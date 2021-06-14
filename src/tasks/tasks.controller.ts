import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/users.entity';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskDto } from './dto/task.dto';
import { PostTransformInterceptor } from './interceptor/post-transform.interceptor';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() taskFilterDto: TaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User '${user.username}' retrieving all tasks; Filters: ${JSON.stringify(
        taskFilterDto,
      )}`,
    );
    return this.tasksService.getTasks(taskFilterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UseInterceptors(new PostTransformInterceptor())
  createTask(@Body() taskDto: TaskDto, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(
      `User '${user.username}' creating a new task; Data: ${JSON.stringify(
        taskDto,
      )}`,
    );
    return this.tasksService.createTask(taskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() taskDto: TaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, taskDto, user);
  }
}
