import type { Type } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { EnvKeys } from '@puq/env';
import {
  secureHeaders,
  configureSwagger,
  GlobalValidationPipe,
} from '@puq/middleware';

/**
 * App options
 */
export type BootstrapOptions = {
  /**
   * App module
   */
  module: () => Type;
};

/**
 * Bootstrap the sample service
 */
export async function bootstrap(options: BootstrapOptions) {
  const app = await NestFactory.create(options.module());

  const config = app.get(ConfigService);

  // Environment variables
  const NAME = config.getOrThrow(EnvKeys.NAME);

  const DESCRIPTION = config.getOrThrow(EnvKeys.DESCRIPTION);

  const PREFIX = config.getOrThrow(EnvKeys.PREFIX);

  const ORIGINS = config.getOrThrow(EnvKeys.ORIGINS);

  const PORT = config.getOrThrow(EnvKeys.PORT);

  const PROFILE = config.getOrThrow(EnvKeys.PROFILE);

  // Add prefix
  app.setGlobalPrefix(PREFIX);

  app.enableCors({ origin: ORIGINS });

  // // Add global pipes
  app.useGlobalPipes(GlobalValidationPipe);

  // Configure helmet
  app.use(secureHeaders());

  configureSwagger({ app, path: 'api', name: NAME, description: DESCRIPTION });

  // Start the app
  await app.listen(PORT);

  Logger.log(`🚀 [${NAME}] [${PROFILE}] [${PORT}] is up and running`);
}
