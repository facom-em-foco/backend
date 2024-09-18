import { Request, Response } from 'express';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import { httpRequestHelper } from '@/helpers/http-request-helper';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/helpers/response-helper';
import AuthService from '@/services/auth.service';

export default class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<void> {
    const { body, headers } = httpRequestHelper(req);

    try {
      const data = await this.authService.login(body);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      sendErrorResponse(res, error, headers);
    }
  }
}
