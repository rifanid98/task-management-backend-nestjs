import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/users.entity';
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

  getTask(taskFilterDto: TaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(taskFilterDto, user);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async createTask(taskDto: TaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(taskDto, user);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskRepository.delete(id);

    if (!task.affected) {
      throw new NotFoundException();
    }
  }

  async updateTask(id: string, taskDto: TaskDto): Promise<Task> {
    const task = await this.getTaskById(id);

    Object.keys(taskDto).forEach((field) => {
      task[field] = taskDto[field];
    });

    await this.taskRepository.save(task);

    return task;
  }
}
