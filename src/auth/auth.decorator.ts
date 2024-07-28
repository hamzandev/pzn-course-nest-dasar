/* Class ini merupakan Custom Decorator */

import {
  createParamDecorator,
  ExecutionContext,
  //   SetMetadata,
} from '@nestjs/common';

// export const Auth = (...args: string[]) => SetMetadata('auth', args);
export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
