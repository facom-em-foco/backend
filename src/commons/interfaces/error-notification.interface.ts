import { IncomingHttpHeaders } from 'http2';

export type ErrorNotificationParams = {
  message: string | null;
  status: number;
  errorKey?: number;
  errorDescription?: string;
  headers: IncomingHttpHeaders;
};
