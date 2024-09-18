import {
  GetAllPostsResponseDTO,
  GetPostByIdResponseDTO,
} from '@/contracts/dtos/response/post-response.dto';
import getPostResponse from '@/contracts/mocks/get-post-response.json';
import getAllPostsResponse from '@/contracts/mocks/get-all-posts-response.json';

export default class PostParser {
  static parserPostResponse(data: any): GetPostByIdResponseDTO {
    return getPostResponse;
  }

  static parserAllPostsResponse(data: any): GetAllPostsResponseDTO {
    return getAllPostsResponse;
  }
}
