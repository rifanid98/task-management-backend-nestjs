import faker from 'faker/locale/id_ID';
import { NotFoundException, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { User } from 'src/auth/users.entity';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { Status } from './types/tasks-status';

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  const mockUser: User = {
    id: 'id',
    username: 'username',
    password: 'password',
    tasks: [],
  };

  const mockTask: Task = {
    id: 'id',
    title: 'title',
    description: 'description',
    status: Status.OPEN,
    user: mockUser,
  };

  const mockTasks: Task[] = [mockTask, mockTask];
  const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
  });

  const MockTasksRepository: Provider = {
    provide: TasksRepository,
    useFactory: mockTasksRepository,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService, MockTasksRepository],
    }).compile();

    tasksService = await module.get(TasksService);
    tasksRepository = await module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('should calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue(mockTasks);
      const tasks = await tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(tasks).toHaveLength(mockTasks.length);
    });
  });

  describe('getTaskById', () => {
    it('should calls TasksRepository.findOne and returns the result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const task = await tasksService.getTaskById(null, mockUser);
      expect(tasksRepository.findOne).toHaveBeenCalled();
      expect(task).toEqual(mockTask);
    });

    it('should calls TasksRepository.findOne and handles an error', () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(null, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
