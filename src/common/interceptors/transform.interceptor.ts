import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Response<T> {
  data: T;
  meta?: PaginatedResponse<T>['meta'];
  success: boolean;
  timestamp: string;
}

type PaginatedEnvelope<T> = {
  data: T;
  meta: PaginatedResponse<unknown>['meta'];
};

function isPaginatedEnvelope<T>(value: unknown): value is PaginatedEnvelope<T> {
  return (
    !!value && typeof value === 'object' && 'data' in value && 'meta' in value
  );
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((response: unknown): Response<T> => {
        // if service already returned { data, meta } shape (paginated)
        if (isPaginatedEnvelope<T>(response)) {
          return {
            data: response.data,
            meta: response.meta,
            success: true,
            timestamp: new Date().toISOString(),
          };
        }

        // plain response (non-paginated, e.g. single transaction, categories list)
        return {
          data: response as T,
          success: true,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
