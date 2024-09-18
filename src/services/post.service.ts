import PostParser from '@/parsers/post.parser';
import {
  GetAllPostsRequestDTO,
  GetPostByIdRequestDTO,
} from '@/contracts/dtos/request/post-request.dto';
import {
  GetAllPostsResponseDTO,
  GetPostByIdResponseDTO,
} from '@/contracts/dtos/response/post-response.dto';

export default class PostService {
  async getById(data: GetPostByIdRequestDTO): Promise<GetPostByIdResponseDTO> {
    const { parserPostResponse } = PostParser;

    return parserPostResponse(data);
  }

  async getByAllPosts(
    data: GetAllPostsRequestDTO,
  ): Promise<GetAllPostsResponseDTO> {
    const { parserAllPostsResponse } = PostParser;

    return parserAllPostsResponse(data);
  }
}
