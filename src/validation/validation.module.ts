import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation.service';

/* Karena kita ingin dynamic module, maka kita perlu hapus semua yang ada di dalam @Module */
@Module({})
export class ValidationModule {
  /* Method custom untuk dynamic module */
  static forRoot(isGlobal?: boolean): DynamicModule {
    return {
      module: ValidationModule,
      global: isGlobal,
      providers: [ValidationService],
      exports: [ValidationService],
    };
  }
}
