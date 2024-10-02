import { Request, Response } from 'express';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import { httpRequestHelper } from '@/helpers/http-request-helper';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/helpers/response-helper';
import PostService from '@/services/post.service';
import { CreatePostSchema } from '@/contracts/dtos/schemas/post.schema';
import { ErrorNotification } from '@/contracts/api/error-notification';
import { RequestValidator } from '@/contracts/api/request-validator';
import { removeFile } from '@/multer-config';
import { remove } from 'lodash';

export default class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(req: Request, res: Response): Promise<void> {
    const { body, file, headers } = httpRequestHelper(req);
    const imagePath = file?.path || '';
    try {
      const tags = body?.tags?.split(',') || [];
      const publisherEmail = res.locals?.user || '';
      const params = { ...body, imagePath, tags, publisherEmail };

      await new RequestValidator(headers).validate(params, CreatePostSchema);

      const data = await this.postService.createPost(params);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      console.log('TesteError', error);
      await removeFile(imagePath);
      sendErrorResponse(res, error, headers);
    }
  }

  async editPostById(req: Request, res: Response): Promise<void> {
    const { body, params, headers } = httpRequestHelper(req);

    const requestParams = { ...body, ...params };

    try {
      const data = await this.postService.editPostById(requestParams);

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

  async deletePostById(req: Request, res: Response): Promise<void> {
    const { params, headers } = httpRequestHelper(req);

    try {
      const data = await this.postService.deletePostById(params);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      sendErrorResponse(res, error, headers);
    }
  }
}
