import { Request, Response } from 'express';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import HelloWorldService from '@/services/hello-world.service';
import { httpRequestHelper } from '@/helpers/http-request-helper';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/helpers/response-helper';

export default class HelloWorldController {
  private helloWorldService: HelloWorldService;

  constructor() {
    this.helloWorldService = new HelloWorldService();
  }

  async helloWorld(req: Request, res: Response): Promise<void> {
    const { query, headers } = httpRequestHelper(req);

    try {
      const data = await this.helloWorldService.helloWorld(query);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      console.log(error);
      sendErrorResponse(res, error, headers);
    }
  }

  async helloWorldError(req: Request, res: Response): Promise<void> {
    const { headers } = httpRequestHelper(req);

    try {
      const data = await this.helloWorldService.helloWorldError();

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      sendErrorResponse(res, error, headers);
    }
  }
}
