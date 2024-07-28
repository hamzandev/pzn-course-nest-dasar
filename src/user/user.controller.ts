import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpRedirectResponse,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Redirect,
  Request as Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request, response, Response } from 'express';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';
import { loginUserRequest, LoginUserRequest } from 'src/model/user.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { TimeInterceptor } from 'src/time/time.interceptor';
import { Auth } from 'src/auth/auth.decorator';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';

@Controller('/api/users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/current')
  /* Implementasi Custom Decorator */
  @UseGuards(RoleGuard)
  /* Implementasi Reflector pada Custome Decodator diatas 🔼 */
  @Roles(['admin', 'operator'])
  async getCurrentUser(@Auth() user: User) {
    return {
      status: 'success',
      message: 'User is Authenticated and Authorized',
      data: user,
    };
  }

  @Post('/login')
  @HttpCode(200)
  @UseFilters(ValidationFilter)

  /* Custom Pipe juga bisa digunakan secara level method (dengan @UsePipes)
  Namun perlu hati-hati dan tentukan type metadata nya di file Validation Pipe nya */
  @UsePipes(new ValidationPipe(loginUserRequest))
  /* Contoh implementasi Interceptor */
  @UseInterceptors(TimeInterceptor)
  async loginUser(
    /* Contoh implementasi custom Pipe (Level param) */
    @Body(new ValidationPipe(loginUserRequest))
    { email }: LoginUserRequest,
  ) {
    const token = crypto.randomUUID();
    return {
      status: 'success',
      message: 'login success',
      email,
      token,
    };
    // return await this.service.loginUser({ email, password });
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() { name, age, email }: User): Promise<User> {
    /* Contoh implementasi HttpExteption (ketimbang membuat Exception Filter) 
    menggunakan fitur bawaan nest: HttpException (nestjs/common) */
    if (!name)
      throw new HttpException({ code: 400, error: 'name is required.' }, 400);

    return await this.service.createUser({
      id: Math.floor(Math.random() * 100) + 1,
      name,
      age: Number(age),
      role: 'operator',
      email,
    });
  }

  @Get()
  @Header('X-Powered-By', 'zannns')
  getAllUsers(
    @Req() req: Request,
    @Query('search') search?: string,
    @Query('page') page?: string,
  ): Promise<User[]> {
    return this.service.getAllUsers();
  }

  @Get('/:id')
  /* Implementasi penggunaan Validation filter pada endpoint route: /api/users/:id */
  @UseFilters(ValidationFilter)
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    return `This action returns a #${id} user`;
    const user = await this.service.getUserById(id);
    if (!user) {
      res.status(404).send({
        message: 'Not Found',
        userId: id,
      });
    }
    return user;
  }

  @Patch('/:id')
  async updateUser(
    /* Contoh implementasi ParseIntPipe (Built-in pipe nest) */
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return await this.service.updateUser(id, user);
  }

  // example redirect route
  @Get('/redirect')
  @Redirect()
  redirectUser(): HttpRedirectResponse {
    return {
      url: '/api/users',
      statusCode: 301,
    };
  }

  @Get('/contoh-service')
  testService() {
    return this.service.testService();
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
