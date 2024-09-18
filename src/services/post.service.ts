import PostParser from '@/parsers/post.parser';
import { GetPostByIdRequestDTO } from '@/contracts/dtos/request/post-request.dto';
import { GetPostByIdResponseDTO } from '@/contracts/dtos/response/post-response.dto';

export default class PostService {
  async getById(data: GetPostByIdRequestDTO): Promise<GetPostByIdResponseDTO> {
    const { parserPostResponse } = PostParser;

    return parserPostResponse(data);
  }
}
