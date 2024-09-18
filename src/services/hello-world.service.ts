import { ErrorNotification } from '@/contracts/api/error-notification';
import { ErrorKeysEnum } from '@/enums/error-keys.enum';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import { HelloWorldRequestDTO } from '@/contracts/dtos/request/hello-world-request.dto';
import { HelloWorldResponseDTO } from '@/contracts/dtos/response/hello-world-response.dto';
import HelloWorldParser from '@/parsers/hello-world.parser';

export default class HelloWorldService {
  async helloWorld(data: HelloWorldRequestDTO): Promise<HelloWorldResponseDTO> {
    const { parserHelloWorldResponse } = HelloWorldParser;

    const test = (
      data.msg || 'Hello World Node.js with Typescript!'
    ).toUpperCase();

    const desc = (data.description || 'Lorem Description...').toLowerCase();

    return parserHelloWorldResponse({ test, desc });
  }

  async helloWorldError(): Promise<any> {
    throw new ErrorNotification({
      message: 'Error Anywhere!',
      errorKey: ErrorKeysEnum.EXTERNAL_ERROR,
      errorDescription: 'External Errors Description',
      status: HttpStatusCode.BAD_REQUEST,
    });
  }
}
