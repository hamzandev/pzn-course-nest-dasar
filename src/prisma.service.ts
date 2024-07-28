import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    console.info('Connecting to Prisma...');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.info('Disconnecting from Prisma...');
    await this.$disconnect();
  }
}
