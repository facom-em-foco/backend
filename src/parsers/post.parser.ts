import { GetPostByIdResponseDTO } from '@/contracts/dtos/response/post-response.dto';
import getPostResponse from '@/contracts/mocks/get-post-response.json';

export default class PostParser {
  static parserPostResponse(data: any): GetPostByIdResponseDTO {
    return getPostResponse;
  }
}
