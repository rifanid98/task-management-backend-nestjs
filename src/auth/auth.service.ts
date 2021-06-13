import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  getUser(authCredentialDto: AuthCredentialDto): Promise<User[]> {
    return this.usersRepository.find(authCredentialDto);
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<User> {
    const users = await this.getUser(authCredentialDto);

    if (users.length > 0) {
      throw new ConflictException(
        `username ${authCredentialDto.username} already exists`,
      );
    }

    return this.usersRepository.createUser(authCredentialDto);
  }
}
