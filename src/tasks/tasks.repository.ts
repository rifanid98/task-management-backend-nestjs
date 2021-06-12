import { EntityRepository, Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { Task } from './tasks.entity';
import { Status } from './types/tasks-status';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(taskDto: TaskDto): Promise<Task> {
    const task = this.create({
      ...taskDto,
      status: Status.OPEN,
    });

    await this.save(task);

    return task;
  }
}
