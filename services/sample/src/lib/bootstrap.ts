import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SampleModule } from './sample/sample.module.js';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalValidationPipe } from '@puq/core';

/**
 * Bootstrap the sample service
 */
export async function bootstrap() {
  const app = await NestFactory.create(SampleModule);
  const config = app.get(ConfigService);
  const PREFIX = config.get('PREFIX', 'api');
  const ORIGINS = config.get('ORIGINS', '*');
  const PORT = config.get('PORT', 3000);

  // Add prefix
  app.setGlobalPrefix(PREFIX);

  app.enableCors({ orign: ORIGINS });

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
        .setTitle('Sample Service')
        .setDescription('Sample Service')
        .build(),
      {},
    ),
  );

  // Start the app
  await app.listen(PORT);

  Logger.log(`🚀 [Sample] is up and running at http://localhost:${PORT}`);
}
