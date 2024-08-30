import { IncomingHttpHeaders } from 'http2';
import { ErrorNotificationParams } from '../interfaces/error-notification.interface';

export class ErrorNotification {
  readonly status: number;

  readonly headers: IncomingHttpHeaders;

  readonly data: {
    errorKey?: number;
    errorMessage: string | null;
    errorDescription?: string;
  };

  constructor(params: ErrorNotificationParams) {
    this.data = {
      errorKey: params.errorKey,
      errorMessage: params.message,
      errorDescription: params.errorDescription,
    };
    this.status = params.status;
    this.headers = params.headers;
  }
}
