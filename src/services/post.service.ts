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

export default class PostService {
  async createPost(data: CreatePostRequestDTO): Promise<CreatePostResponseDTO> {
    const { parserPostResponse } = PostParser;

    return parserPostResponse(data);
  }

  async editPostById(data: EditPostRequestDTO): Promise<EditPostResponseDTO> {
    const { parserPostResponse } = PostParser;

    return parserPostResponse(data);
  }

  async getByAllPosts(
    data: GetAllPostsRequestDTO,
  ): Promise<GetAllPostsResponseDTO> {
    const { parserAllPostsResponse } = PostParser;

    return parserAllPostsResponse(data);
  }

  async getById(data: GetPostByIdRequestDTO): Promise<GetPostByIdResponseDTO> {
    const { parserPostResponse } = PostParser;

    return parserPostResponse(data);
  }

  async deletePostById(
    data: DeletePostRequestDTO,
  ): Promise<DeletePostResponseDTO> {
    const { parserPostResponse } = PostParser;

    return parserPostResponse(data);
  }
}
