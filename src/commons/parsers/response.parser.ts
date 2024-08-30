import _ from 'lodash';
import { IncomingHttpHeaders } from 'http2';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import {
  SuccessResponse,
  ErrorResponse,
} from '../interfaces/generic-response.interface';
import { ApiError } from '../interfaces/api-error.interface';
import { ErrorKeysEnum } from '../enums/error-keys.enum';
import { ErrorNotification } from '../class/error-notification';

const defaultSuccessResponse = { success: true };

const defaultErrorResponse: ApiError = {
  errorKey: ErrorKeysEnum.EXTERNAL_ERROR,
  errorMessage: 'Unkown error',
};

export const parseSuccessResponse = (
  headers: IncomingHttpHeaders,
  data?: any,
): SuccessResponse => {
  return {
    status: HttpStatusCode.OK,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    data: _.isEmpty(data) ? defaultSuccessResponse : data,
  };
};

export const parseErrorResponse = (
  error: any = {},
  headers: IncomingHttpHeaders,
  status?: number,
): ErrorResponse | ErrorNotification => {
  if (error instanceof ErrorNotification) {
    return {
      status: error.status || HttpStatusCode.INTERNAL_SERVER_ERROR,
      headers: error.headers,
      data: error.data,
    };
  }

  return {
    status: _.isUndefined(status)
      ? HttpStatusCode.INTERNAL_SERVER_ERROR
      : status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    data: _.isEmpty(error) ? defaultErrorResponse : error,
  };
};
