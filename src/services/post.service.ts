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

export default class PostService {
  private postRepository: PostRepository;
  private tagService: TagService;
  private userService: UserService;

  constructor() {
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

    const createdPost = await this.postRepository.create(post);

    return parserPostResponse(createdPost);
  }

  async editPostById(data: EditPostRequestDTO): Promise<EditPostResponseDTO> {
    const { parserPostResponse } = PostParser;

    return parserPostResponse(new Post());
  }

  async getByAllPosts(
    data: GetAllPostsRequestDTO,
  ): Promise<GetAllPostsResponseDTO> {
    const { parserAllPostsResponse } = PostParser;

    return parserAllPostsResponse(data);
  }

  async getById(data: GetPostByIdRequestDTO): Promise<GetPostByIdResponseDTO> {
    const { parserPostResponse } = PostParser;

    return parserPostResponse(new Post());
  }

  async deletePostById(
    data: DeletePostRequestDTO,
  ): Promise<DeletePostResponseDTO> {
    const { parserPostResponse } = PostParser;

    return parserPostResponse(new Post());
  }
}
