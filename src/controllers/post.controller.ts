import { Request, Response } from 'express';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import { httpRequestHelper } from '@/helpers/http-request-helper';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/helpers/response-helper';
import PostService from '@/services/post.service';

export default class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async getPostById(req: Request, res: Response): Promise<void> {
    const { params, headers } = httpRequestHelper(req);

    try {
      const data = await this.postService.getById(params);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      sendErrorResponse(res, error, headers);
    }
  }
}
