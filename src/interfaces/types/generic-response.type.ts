import { ErrorNotification } from '../../contracts/api/error-notification';
import { ApiError } from './api-error.type';

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
