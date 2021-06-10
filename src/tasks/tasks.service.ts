import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TaskFilterDto } from './dto/task-filter.dto';
import { TaskDto } from './dto/task.dto';
import { Status, Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilter(taskFilterDto: TaskFilterDto): Task[] {
    return this.tasks.filter(
      (task) =>
        task.status.toLowerCase().includes(taskFilterDto.status) ||
        task.title.toLowerCase().includes(taskFilterDto.search) ||
        task.description.toLowerCase().includes(taskFilterDto.search),
    );
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  createTask(taskDto: TaskDto): Task {
    const task: Task = {
      id: uuid(),
      ...taskDto,
      status: Status.OPEN,
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
