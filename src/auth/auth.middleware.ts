import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

/* Class Middleware ini digunakan untuk membuat contoh Custom Decorator */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    const userEmail = req.headers['x-user-email'] as string;
    if (!userEmail) {
      throw new HttpException(
        { status: 'Unauthorized', code: 401, message: 'You are Unauthorized' },
        401,
      );
    }

    const user = await this.prismaService.user.findUnique({
      where: { email: userEmail },
    });

    if (user) {
      req.user = user;
      next();
    } else {
      throw new HttpException(
        { status: 'Unauthorized', code: 401, message: 'You are Unauthorized' },
        401,
      );
    }
  }
}
