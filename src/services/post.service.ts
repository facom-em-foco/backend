import PostParser from '@/parsers/post.parser';
import {
  CreatePostRequestDTO,
  DeletePostRequestDTO,
  EditPostRequestDTO,
  GetAllPostsRequestDTO,
  GetPostByIdRequestDTO,
} from '@/contracts/dtos/request/post-request.dto';
import {
  CreatePostResponseDTO,
  DeletePostResponseDTO,
  EditPostResponseDTO,
  GetAllPostsResponseDTO,
  GetPostByIdResponseDTO,
} from '@/contracts/dtos/response/post-response.dto';
import { PostRepository } from '@/repositories/post.repository';
import { Post } from '@/entities/Post';
import TagService from './tag.service';
import UserService from './user.service';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import { ErrorNotification } from '@/contracts/api/error-notification';
import { ErrorKeysEnum } from '@/enums/error-keys.enum';
import { removeFile } from '@/multer-config';

export default class PostService {
  private UPLOADS_PATH: string;

  private postRepository: PostRepository;
  private tagService: TagService;
  private userService: UserService;

  constructor() {
    this.UPLOADS_PATH = process.env.UPLOADS_PATH || '/uploads';

    this.postRepository = new PostRepository();
    this.tagService = new TagService();
    this.userService = new UserService();
  }

  async createPost(data: CreatePostRequestDTO): Promise<CreatePostResponseDTO> {
    const { parserCreatePost, parserPostResponse } = PostParser;

    const tags = await this.tagService.validateTags(data.tags);
    const publisher = await this.userService.getPublisherByEmail(
      data.publisherEmail,
    );

    const post = parserCreatePost(data, tags, publisher);

    const createdPost = await this.postRepository.save(post);

    return parserPostResponse(createdPost);
  }

  async editPostById(data: EditPostRequestDTO): Promise<EditPostResponseDTO> {
    const { parserEditPost, parserPostResponse } = PostParser;

    const tags = data.tags
      ? await this.tagService.validateTags(data.tags)
      : data.tags;

    const post = await this.postRepository.findById(+data.id);

    if (!post) {
      throw new ErrorNotification({
        message: 'Post not found!',
        errorKey: ErrorKeysEnum.POST_NOT_FOUND,
        errorDescription: 'No post found to edit',
        status: HttpStatusCode.NOT_FOUND,
      });
    }

    const modifiedPost = parserEditPost(post, data, tags);

    if (
      !modifiedPost.textContent &&
      !modifiedPost.link &&
      !modifiedPost.imagePath
    ) {
      throw new ErrorNotification({
        message: 'Description, link and imagePath cannot be empty',
        errorKey: ErrorKeysEnum.PARAMS_VALIDATION,
        errorDescription:
          'Description, link and imagePath cannot be empty when editing post',
        status: HttpStatusCode.BAD_REQUEST,
      });
    }

    const editedPost = await this.postRepository.save(modifiedPost);

    // Remove old image
    if (post.imagePath !== editedPost.imagePath) {
      await removeFile(`.${this.UPLOADS_PATH}/${post.imagePath}`);
    }

    return parserPostResponse(editedPost);
  }

  async getAllPosts(
    data: GetAllPostsRequestDTO,
  ): Promise<GetAllPostsResponseDTO> {
    const { parserAllPostsResponse } = PostParser;

    const posts = await this.postRepository.getAllPosts(data);

    return parserAllPostsResponse(posts);
  }

  async getById(data: GetPostByIdRequestDTO): Promise<GetPostByIdResponseDTO> {
    const { parserPostResponse } = PostParser;

    const post = await this.postRepository.findById(+data.id);

    if (!post) {
      throw new ErrorNotification({
        message: 'Post not found!',
        errorKey: ErrorKeysEnum.POST_NOT_FOUND,
        errorDescription: 'Post not found',
        status: HttpStatusCode.NOT_FOUND,
      });
    }

    return parserPostResponse(post);
  }

  async deletePostById(
    data: DeletePostRequestDTO,
  ): Promise<DeletePostResponseDTO> {
    const { parserPostResponse } = PostParser;

    const post = await this.postRepository.findById(+data.id);

    if (!post) {
      throw new ErrorNotification({
        message: 'Post not found!',
        errorKey: ErrorKeysEnum.POST_NOT_FOUND,
        errorDescription: 'Post not found to delete',
        status: HttpStatusCode.NOT_FOUND,
      });
    }

    const postResponse = parserPostResponse(post);

    await this.postRepository.remove(post);

    if (post.imagePath) {
      await removeFile(`.${this.UPLOADS_PATH}/${post.imagePath}`);
    }

    return postResponse;
  }
}
