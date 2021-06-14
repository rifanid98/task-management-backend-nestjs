import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const configModuleOptions = (): ConfigModuleOptions => ({
  envFilePath: [`.env`],
});

export const configModuleSchema = Joi.object({
  PORT: Joi.number().default(5000).required(),
  DB_HOST: Joi.string().trim().required(),
  DB_USER: Joi.string().trim().required(),
  DB_PASS: Joi.string().trim().required(),
  DB_NAME: Joi.string().trim().required(),
  DB_PORT: Joi.string().trim().required(),
  SECRET: Joi.string().trim().required(),
});
