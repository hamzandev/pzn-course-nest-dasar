import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      /* Contoh men-transformasi objek responnya 
      menjadi bentuk lain (menambahkan timestamp pada body) */
      map((value) => {
        value.timestamp = new Date();
        return value;
      }),
    );
  }
}
