import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(title: string, description?: string): Task {
    const task: Task = {
      id: new ParseUUIDPipe().toString(),
      title,
      description,
      status: 'OPEN',
    };

    this.tasks.push(task);
    return task;
  }
}
