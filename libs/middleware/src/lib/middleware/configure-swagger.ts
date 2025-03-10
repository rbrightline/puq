import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { notEmptyOrThrow } from '@puq/is';

/**
 * Swagger options
 */
export type SwaggerOptions = {
  /**
   * App instance
   */
  app: INestApplication;
  /**
   * App name
   */
  name: string;

  /**
   * App description
   */
  description: string;

  /**
   * Swagger path
   */
  path: string;
};

/**
 * Configure swagger for the project. Run this function before the server starts to listen
 * @param options - {@link SwaggerOptions}
 */
export function configureSwagger(options: SwaggerOptions) {
  const { app, description, name, path } = options;

  notEmptyOrThrow(name);
  notEmptyOrThrow(path);

  // Configure swagger
  SwaggerModule.setup(
    path,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addBearerAuth()
        .setTitle(name)
        .setDescription(description)
        .build(),
      {},
    ),
  );
}
