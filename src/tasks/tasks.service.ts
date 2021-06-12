import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { Status } from './types/tasks-status';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilter(taskFilterDto: TaskFilterDto): Task[] {
  //   return this.tasks.filter(
  //     (task) =>
  //       task.status.toLowerCase().includes(taskFilterDto.status) ||
  //       task.title.toLowerCase().includes(taskFilterDto.search) ||
  //       task.description.toLowerCase().includes(taskFilterDto.search),
  //   );
  // }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async createTask(taskDto: TaskDto): Promise<Task> {
    return this.taskRepository.createTask(taskDto);
  }

  // deleteTask(id: string): void {
  //   const task = this.getTaskById(id);

  //   if (!task) {
  //     throw new NotFoundException();
  //   }

  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateTask(id, taskDto: TaskDto): Task {
  //   const task = this.getTaskById(id);
  //   Object.keys(taskDto).forEach((key) => {
  //     task[key] = taskDto[key];
  //   });
  //   return task;
  // }
}
