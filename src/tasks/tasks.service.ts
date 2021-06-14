import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/users.entity';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskDto } from './dto/task.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}

  getTasks(taskFilterDto: TaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(taskFilterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ id, user });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async createTask(taskDto: TaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(taskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this.taskRepository.delete({ id, user });

    if (!task.affected) {
      throw new NotFoundException();
    }
  }

  async updateTask(id: string, taskDto: TaskDto, user): Promise<Task> {
    const task = await this.getTaskById(id, user);

    Object.keys(taskDto).forEach((field) => {
      task[field] = taskDto[field];
    });

    await this.taskRepository.save(task);

    return task;
  }
}
