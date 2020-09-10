import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { setupSwagger } from './utils/setup-swagger';
import { setupSentry } from './utils/setup-sentry';

NestFactory.create(AppModule).then(app => {
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);
  setupSentry(app);

  app.listen(process.env.HTTP_PORT);
});
