import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware<Request, Response> {
  // constructor() {}

  use(req: Request, res: Response, next: () => void) {
    console.info({
      middlewareName: 'User Middleware',
      hostname: req.hostname,
      path: req.path,
      message: 'Hello from User Middleware',
    });

    next();
  }
}
