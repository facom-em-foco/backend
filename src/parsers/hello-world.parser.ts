import { HelloWorldResponseDTO } from '@/contracts/dtos/response/hello-world-response.dto';

export default class HelloWorldParser {
  static parserHelloWorldResponse(data: any): HelloWorldResponseDTO {
    return {
      message: data.test,
      description: data.desc,
    };
  }
}
