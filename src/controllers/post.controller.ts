import { Request, Response } from 'express';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import { httpRequestHelper } from '@/helpers/http-request-helper';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '@/helpers/response-helper';
import PostService from '@/services/post.service';
import {
  CreatePostSchema,
  GetAllPostsSchema,
  EditPostSchema,
  GetPostByIdSchema,
} from '@/contracts/dtos/schemas/post.schema';
import { RequestValidator } from '@/contracts/api/request-validator';
import { removeFile } from '@/multer-config';
import { splitBy } from '@/helpers/array-helper';

export default class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  async createPost(req: Request, res: Response): Promise<void> {
    const { body, file, headers } = httpRequestHelper(req);
    const imagePath = file?.filename || '';
    try {
      const tags = splitBy(body?.tags, ',');
      const publisherEmail = res.locals?.user || '';
      const payload = { ...body, imagePath, tags, publisherEmail };

      await new RequestValidator(headers).validate(payload, CreatePostSchema);

      const data = await this.postService.createPost(payload);

      sendSuccessResponse(res, data, headers, HttpStatusCode.CREATED);
    } catch (error) {
      await removeFile(imagePath);
      sendErrorResponse(res, error, headers);
    }
  }

  async editPostById(req: Request, res: Response): Promise<void> {
    const { body, params, file, headers } = httpRequestHelper(req);
    const imagePath = file?.filename || undefined;

    try {
      const tags =
        body?.tags !== undefined ? splitBy(body.tags, ',') : body?.tags;
      const payload = { ...body, ...params, imagePath, tags };

      await new RequestValidator(headers).validate(payload, EditPostSchema);

      const data = await this.postService.editPostById(payload);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      await removeFile(imagePath);
      sendErrorResponse(res, error, headers);
    }
  }

  async getPostById(req: Request, res: Response): Promise<void> {
    const { params, headers } = httpRequestHelper(req);

    try {
      await new RequestValidator(headers).validate(params, GetPostByIdSchema);

      const data = await this.postService.getById(params);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      sendErrorResponse(res, error, headers);
    }
  }

  async getAllPosts(req: Request, res: Response): Promise<void> {
    const { query, headers } = httpRequestHelper(req);

    const ids = splitBy(query?.ids, ',');
    const tags = splitBy(query?.tags, ',');
    const params = { ...query, ids, tags };

    try {
      await new RequestValidator(headers).validate(params, GetAllPostsSchema);

      const data = await this.postService.getAllPosts(params);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      console.log('TesteError', error);
      sendErrorResponse(res, error, headers);
    }
  }

  async deletePostById(req: Request, res: Response): Promise<void> {
    const { params, headers } = httpRequestHelper(req);

    try {
      const data = await this.postService.deletePostById(params);

      sendSuccessResponse(res, data, headers, HttpStatusCode.OK);
    } catch (error) {
      console.log('TesteError', error);
      sendErrorResponse(res, error, headers);
    }
  }
}
