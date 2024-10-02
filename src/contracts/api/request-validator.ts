import { ErrorKeysEnum } from '@/enums/error-keys.enum';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import { IncomingHttpHeaders } from 'http2';
import { AnySchema, ValidationError } from 'yup';
import { ErrorNotification } from './error-notification';

const emptyErrorResponse: ErrorNotification = {
  headers: {},
  data: {
    errorMessage: '',
    errorKey: 0,
  },
  status: 0,
};

interface IRequestValidator {
  validate: (params: any, schema: AnySchema, statusResponse: any) => void;
}
export class RequestValidator implements IRequestValidator {
  private error: ErrorNotification;

  private readonly headers: IncomingHttpHeaders;

  constructor(headers: IncomingHttpHeaders) {
    this.error = emptyErrorResponse;
    this.headers = headers;
  }

  private setErrorMessage(error: any, customErrorKey?: number) {
    this.error = new ErrorNotification({
      message: error.message,
      errorKey: customErrorKey || ErrorKeysEnum.PARAMS_VALIDATION,
      errorDescription: '',
      status: HttpStatusCode.BAD_REQUEST,
    });
  }

  public async validate(params: any, schema: AnySchema) {
    const validateSchema = await schema
      .validate(params)
      .catch((error: ValidationError) => {
        this.setErrorMessage(error);
      });

    if (!validateSchema) {
      throw this.error;
    }
  }
}
