
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  console.log('[startup] Creating Nest application');

  const app = await NestFactory.create(AppModule);

  console.log('[startup] Nest application created');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;

  await app.listen(port, '0.0.0.0');

  console.log(`[startup] Nest listening on port ${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error('[startup] Nest bootstrap failed:', error);
  process.exitCode = 1;
});
