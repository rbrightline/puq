import type { Type } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { GlobalValidationPipe } from '@puq/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppEnv } from './app-env.js';
import { notEmptyOrThrow } from '@puq/is';

export type BootstrapOptions = {
  name: string;
  profile: string;
  module: Type;
};
/**
 * Bootstrap the sample service
 */
export async function bootstrap(options: BootstrapOptions) {
  notEmptyOrThrow(options.name);
  notEmptyOrThrow(options.profile);
  const app = await NestFactory.create(options.module);
  const config = app.get(ConfigService);

  const env = new AppEnv({ ...options });

  // Environment variables
  const NAME = config.getOrThrow(env.NAME);
  const DESCRIPTION = config.getOrThrow(env.DESCRIPTION);
  const PREFIX = config.getOrThrow(env.PREFIX);
  const ORIGINS = config.getOrThrow(env.ORIGIN);
  const PORT = config.getOrThrow(env.PORT);
  const PROFILE = config.getOrThrow(env.PROFILE);

  // Add prefix
  app.setGlobalPrefix(PREFIX);

  app.enableCors({ origin: ORIGINS });

  // Add global pipes
  app.useGlobalPipes(GlobalValidationPipe);

  // Configure helmet
  app.use(helmet());

  // Configure swagger
  SwaggerModule.setup(
    PREFIX,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addBearerAuth()
        .setTitle(NAME)
        .setDescription(DESCRIPTION)
        .build(),
      {},
    ),
  );

  // Start the app
  await app.listen(PORT);

  Logger.log(`🚀 [${NAME}] [${PROFILE}] [${PORT}] is up and running`);
}
