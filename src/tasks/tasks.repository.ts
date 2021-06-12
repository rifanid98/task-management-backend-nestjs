import { EntityRepository, ILike, Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { Task } from './tasks.entity';
import { Status } from './types/tasks-status';
import { TaskFilterDto } from './dto/task-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(taskFilterDto: TaskFilterDto): Promise<Task[]> {
    const tasks = await this.find({
      where: [
        { title: ILike(taskFilterDto.search) },
        { description: ILike(taskFilterDto.search) },
        { status: taskFilterDto.status },
      ],
    });

    return tasks;
  }

  async createTask(taskDto: TaskDto): Promise<Task> {
    const task = this.create({
      ...taskDto,
      status: Status.OPEN,
    });

    await this.save(task);

    return task;
  }
}
