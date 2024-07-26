import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Param,
  Query,
  Redirect,
  Request as Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/service')
  testService() {
    return this.service.testService();
  }

  @Get()
  @Header('X-Powered-By', 'zannns')
  @HttpCode(201)
  getAllUsers(
    @Req() req: Request,
    @Query('search') search?: string,
    @Query('page') page?: string,
  ) {
    return this.service.getAllUsers({ page, search });
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.service.getUserById(id);
  }

  // example redirect
  @Get('/redirect')
  @Redirect()
  redirectUser(): HttpRedirectResponse {
    return {
      url: '/api/users',
      statusCode: 301,
    };
  }

  // async method example
  @Get('/async')
  @Header('X-Powered-By', 'Zannns')
  async asynsUser(): Promise<string> {
    return 'Async User';
  }

  // cookie implementation example
  /* 
    karena nest tidak memiliki cookies manajemen default, 
    maka harus menggunakan @Req dan @Res milik express 
   */
  @Get('/set-cookie')
  setUserCookie(@Res() res: Response, @Query('name') name: string) {
    res.cookie('name', name);
    res.json({
      message: 'Cookie set successfuly!',
      cookie: name,
    });
  }

  @Get('/get-cookie')
  getUserCookie(@Req() req: Request) {
    return {
      'user-cookie': req.cookies['name'],
    };
  }
}
