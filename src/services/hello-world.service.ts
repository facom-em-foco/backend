import { ErrorNotification } from '@/commons/class/error-notification';
import { ErrorKeysEnum } from '@/commons/enums/error-keys.enum';
import { HttpStatusCode } from '@/commons/enums/http-status-code.enum';
import {
  ErrorResponse,
  SuccessResponse,
} from '@/commons/interfaces/generic-response.interface';
import { HttpRequest } from '@/commons/interfaces/http-request.interface';
import {
  parseErrorResponse,
  parseSuccessResponse,
} from '@/commons/parsers/response.parser';

export const helloWorldService = async (
  httpRequest: HttpRequest,
): Promise<SuccessResponse | ErrorNotification | ErrorResponse> => {
  try {
    const msg = 'Hello World! TypeScript with Express!';

    const response = {
      data: { msg },
      headers: {},
    };

    return parseSuccessResponse(response.headers, response.data);
  } catch (error) {
    return parseErrorResponse(error, httpRequest.headers);
  }
};

export const helloWorldErrorService = async (
  httpRequest: HttpRequest,
): Promise<SuccessResponse | ErrorNotification | ErrorResponse> => {
  try {
    throw new ErrorNotification({
      message: 'Error Anywhere!',
      errorKey: ErrorKeysEnum.EXTERNAL_ERROR,
      errorDescription: 'External Errors Description',
      status: HttpStatusCode.BAD_REQUEST,
      headers: httpRequest.headers,
    });
  } catch (error) {
    return parseErrorResponse(error, httpRequest.headers);
  }
};
