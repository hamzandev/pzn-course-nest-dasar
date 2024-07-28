import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
// import { ValidationFilter } from './validation/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Mengubah default Logger Console NestJS ke Winston Logger */
  // const winstonLoggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  // app.useLogger(winstonLoggerService);

  app.use(cookieParser('SECRET COOKIE KEY'));
  /* Implementasi penggunaan lifecycle event dengan menyalakan fitur shutdownhooks */
  app.enableShutdownHooks();
  /* Contoh implementasi Exception Filer secara global */
  // app.useGlobalFilters(new ValidationFilter());

  await app.listen(3001);
}
bootstrap();
