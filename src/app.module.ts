import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import typeormConfig from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TasksModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
