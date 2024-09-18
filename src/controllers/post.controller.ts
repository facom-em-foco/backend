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

  async createPost(req: Request, res: Response): Promise<void> {
    const { body, headers } = httpRequestHelper(req);

    try {
      const data = await this.postService.createPost(body);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      sendErrorResponse(res, error, headers);
    }
  }

  async editPost(req: Request, res: Response): Promise<void> {
    const { body, params, headers } = httpRequestHelper(req);

    const requestParams = { ...body, ...params };

    try {
      const data = await this.postService.editPost(requestParams);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      sendErrorResponse(res, error, headers);
    }
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

  async getAllPosts(req: Request, res: Response): Promise<void> {
    const { query, headers } = httpRequestHelper(req);

    try {
      const data = await this.postService.getByAllPosts(query);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      sendErrorResponse(res, error, headers);
    }
  }
}
