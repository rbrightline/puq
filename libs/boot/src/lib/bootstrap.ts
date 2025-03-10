import type { LogLevel, Type } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { notEmptyOrThrow } from '@puq/is';
import { AppEnv } from '@puq/env';
import {
  GlobalValidationPipe,
  secureHeaders,
  configureSwagger,
} from '@puq/middleware';

export type BootstrapOptions = {
  name: string;
  profile: string;
  module: Type;
  logger?: LogLevel[];
};
/**
 * Bootstrap the sample service
 */
export async function bootstrap(options: BootstrapOptions) {
  notEmptyOrThrow(options.name);
  notEmptyOrThrow(options.profile);

  const app = await NestFactory.create(options.module, {
    logger:
      (options.logger ?? options.profile === 'dev')
        ? ['log', 'debug']
        : undefined,
  });

  const config = app.get(ConfigService);

  const AppEnvKeys = new AppEnv({ ...options });

  // Environment variables
  const NAME = config.getOrThrow(AppEnvKeys.NAME);

  const DESCRIPTION = config.getOrThrow(AppEnvKeys.DESCRIPTION);

  const PREFIX = config.getOrThrow(AppEnvKeys.PREFIX);

  const ORIGINS = config.getOrThrow(AppEnvKeys.ORIGIN);

  const PORT = config.getOrThrow(AppEnvKeys.PORT);

  const PROFILE = config.getOrThrow(AppEnvKeys.PROFILE);

  // Add prefix
  app.setGlobalPrefix(PREFIX);

  app.enableCors({ origin: ORIGINS });

  // Add global pipes
  app.useGlobalPipes(GlobalValidationPipe);

  // Configure helmet
  app.use(secureHeaders());

  configureSwagger({ app, path: 'api', name: NAME, description: DESCRIPTION });

  // Start the app
  await app.listen(PORT);

  Logger.log(`🚀 [${NAME}] [${PROFILE}] [${PORT}] is up and running`);
}
