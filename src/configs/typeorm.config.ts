import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5455,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs',
  autoLoadEntities: true,
  synchronize: true,
};

export default typeormConfig;
