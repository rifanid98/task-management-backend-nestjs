import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(title: string, description?: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: 'OPEN',
    };

    this.tasks.push(task);
    return task;
  }
}
