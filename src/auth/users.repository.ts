import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<User> {
    const user = this.create(authCredentialDto);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredentialDto.password, salt);

    user.password = hashedPassword;

    try {
      await this.save(user);
      delete user.password;
      return user;
    } catch (error) {
      if (Number(error.code) === 23505) {
        throw new ConflictException(
          `username ${authCredentialDto.username} already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
