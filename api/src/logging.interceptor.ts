import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') return this.logHttpCall(context, next);
  }

  private logHttpCall(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'] || '';
    const { ip, method, url } = request;
    const correlationKey = uuidv4();

    this.logger.log(
      `[${correlationKey}] ${method} ${url} ${userAgent} ${ip}: ${
        context.getClass().name
      } ${context.getHandler().name}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();

        const { statusCode, raw } = response;

        this.logger.log(
          `[${correlationKey}] ${method} ${url} ${statusCode} ${raw.outputSize}: ${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}
