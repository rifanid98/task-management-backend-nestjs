import { EntityRepository, ILike, Raw, Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { Task } from './tasks.entity';
import { Status } from './types/tasks-status';
import { TaskFilterDto } from './dto/task-filter.dto';
import { User } from 'src/auth/users.entity';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger('TasksRepository');

  async getTasks(taskFilterDto: TaskFilterDto, user: User): Promise<Task[]> {
    const { search, status } = taskFilterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user '${
          user.username
        }'; Filters: ${JSON.stringify(taskFilterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    // const tasks = await this.find({
    //   where: [
    //     { title: ILike(search) },
    //     { description: ILike(search) },
    //     { status },
    //     { user },
    //   ],
    // });

    // return tasks;
  }

  async createTask(taskDto: TaskDto, user: User): Promise<Task> {
    const task = this.create({
      ...taskDto,
      status: Status.OPEN,
      user,
    });

    try {
      await this.save(task);
    } catch (error) {
      if (error.hasOwnProperty('code') && Number(error.code) === 23505) {
        throw new ConflictException(
          `The task with the title '${taskDto.title}' already exists`,
        );
      }
    }

    return task;
  }
}
