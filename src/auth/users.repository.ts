import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<User> {
    const user = this.create(authCredentialDto);
    await this.save(user);
    delete user.password;
    return user;
  }
}
