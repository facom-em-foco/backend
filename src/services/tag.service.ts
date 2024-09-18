import { GetTagByIdRequestDTO } from '@/contracts/dtos/request/tags-request.dto';
import { GetTagByIdResponseDTO } from '@/contracts/dtos/response/tags-response.dto';
import TagParser from '@/parsers/tag-parser';

export default class TagService {
  async getById(data: GetTagByIdRequestDTO): Promise<GetTagByIdResponseDTO> {
    const { parserTagResponse } = TagParser;

    return parserTagResponse(data);
  }

  async getAll(data: GetTagByIdRequestDTO): Promise<GetTagByIdResponseDTO[]> {
    const { parserAllTagsResponse } = TagParser;

    return parserAllTagsResponse(data);
  }
}
