import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private zodType: ZodType) {}

  transform(value: any, metadata: ArgumentMetadata) {
    /* cek dulu dengan if else disini jika kamu
    menggunakan pipe di level method */
    // if (metadata.type == 'body') return this.zodType.parse(value);
    // return value;

    return this.zodType.parse(value);
  }
}
