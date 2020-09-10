import { INestApplication } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './sentry.interceptor';

export function setupSentry(app: INestApplication) {
  if (process.env.SENTRY_DSN) {
    Sentry.init({ dsn: process.env.SENTRY_DSN });
    app.use(Sentry.Handlers.requestHandler());
    app.useGlobalInterceptors(new SentryInterceptor());
  }
}
