import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

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

  getAllUsers({ search, page }) {
    if (search) {
      const filterUser = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
      if (Number(page))
        return {
          page: Number(page),
          data: this.users,
        };
      return filterUser;
    }

    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === Number(id));
  }
}
