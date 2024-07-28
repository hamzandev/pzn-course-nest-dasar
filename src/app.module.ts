import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { ValidationModule } from './validation/validation.module';
import * as winston from 'winston';
import { UserMiddleware } from './user/user.middleware';
import { UserController } from './user/user.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    UserModule,
    StudentsModule,
    /* Konfigurasi Config untuk Env */
    ConfigModule.forRoot({ isGlobal: true }),

    /* konfigurasi Winston Module untuk Winston Logger */
    // WinstonModule.forRoot({
    //   format: winston.format.cli(),
    //   level: 'debug',
    //   transports: [new winston.transports.Console()],
    // }),

    /* Custom dynamic module */
    ValidationModule.forRoot(true),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /* Implementasi penggunaan user middleware */
    consumer.apply(UserMiddleware).forRoutes(UserController);
    /* Implementasi penggunaan Auth middleware */
    consumer.apply(AuthMiddleware).forRoutes({
      method: RequestMethod.GET,
      path: '/api/users/current',
    });
  }
}
