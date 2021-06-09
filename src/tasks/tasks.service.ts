import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TaskDto } from './dto/task.dto';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(taskDto: TaskDto): Task {
    const task: Task = {
      id: uuid(),
      ...taskDto,
      status: 'OPEN',
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id, taskDto: TaskDto): Task {
    const task = this.getTaskById(id);
    Object.keys(taskDto).forEach((key) => {
      task[key] = taskDto[key];
    });
    return task;
  }
}
