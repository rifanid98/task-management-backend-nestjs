import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { typeormConfig } from './configs/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import environtmentConfig from './configs/environtment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environtmentConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfig,
    }),
    TasksModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
