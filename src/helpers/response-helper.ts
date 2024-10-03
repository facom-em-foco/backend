import _ from 'lodash';
import { IncomingHttpHeaders } from 'http2';
import { HttpStatusCode } from '../enums/http-status-code.enum';
import {
  SuccessResponse,
  ErrorResponse,
} from '../interfaces/types/generic-response.type';
import { ApiError } from '../interfaces/types/api-error.type';
import { ErrorKeysEnum } from '../enums/error-keys.enum';
import { ErrorNotification } from '../contracts/api/error-notification';
import { Response } from 'express';

const defaultSuccessResponse = { success: true };

const defaultErrorResponse: ApiError = {
  errorKey: ErrorKeysEnum.EXTERNAL_ERROR,
  errorMessage: 'Unkown error',
};

export const parseSuccessResponse = (
  headers: IncomingHttpHeaders,
  data?: any,
  status = HttpStatusCode.OK,
): SuccessResponse => {
  return {
    status,
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
      headers: error.headers || headers,
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

export const sendSuccessResponse = (
  res: Response,
  data: any,
  headers: IncomingHttpHeaders,
  status?: number,
): void => {
  const response: SuccessResponse = parseSuccessResponse(headers, data, status);
  res.status(response.status);
  res.header(response.headers);
  res.send(response.data);
};

export const sendErrorResponse = (
  res: Response,
  error: any,
  headers: IncomingHttpHeaders,
): void => {
  const response: ErrorResponse | ErrorNotification = parseErrorResponse(
    error,
    headers,
  );

  res.status(response.status);
  res.header(response.headers);
  res.send(response.data);
};
