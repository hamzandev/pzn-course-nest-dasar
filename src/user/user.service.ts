import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ValidationService } from 'src/validation/validation.service';
import z from 'zod';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private validationService: ValidationService,
  ) {}

  users = [
    {
      id: 1,
      name: 'Hamzan',
      age: 20,
      email: 'ZIqFP@example.com',
    },
    {
      id: 2,
      name: 'Imam Ikhlasul',
      age: 23,
      email: 'X8oJt@example.com',
    },
    {
      id: 3,
      name: 'Riski Deni Pratama',
      age: 22,
      email: 'YD8oA@example.com',
    },
  ];

  async testService(): Promise<string> {
    return 'This Controller is using Service';
  }

  async createUser(data: User): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async getAllUsers() {
    // if (search) {
    //   const filterUser = this.users.filter(
    //     (user) =>
    //       user.name.toLowerCase().includes(search.toLowerCase()) ||
    //       user.email.toLowerCase().includes(search.toLowerCase()),
    //   );
    //   if (Number(page))
    //     return {
    //       page: Number(page),
    //       data: this.users,
    //     };
    //   return filterUser;
    // }

    // return this.users;
    return await this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    /* 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥 Contoh implementasi validation service 
    yang merupakan custom dynamic module yang kita buat */
    const schema = z.number().min(2).max(255); //gunakan validasi zod lainnya;
    const validated = this.validationService.validate(schema, id);
    return await this.prisma.user.findUnique({ where: { id: validated } });
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: user,
    });
  }
}
