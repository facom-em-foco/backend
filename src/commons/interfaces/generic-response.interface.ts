import { ErrorNotification } from '../class/error-notification';
import { ApiError } from './api-error.interface';

export interface SuccessResponse {
  status: number;
  headers: any;
  data: any;
}

export interface ErrorResponse {
  status: number;
  headers?: any;
  data: ApiError;
}

export type Response = SuccessResponse | ErrorResponse | ErrorNotification;
