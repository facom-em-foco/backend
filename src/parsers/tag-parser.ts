import { GetTagByIdResponseDTO } from '@/contracts/dtos/response/tags-response.dto';
import getAllTagsResponse from '@/contracts/mocks/get-all-tags-response.json';
import getTagResponse from '@/contracts/mocks/get-tag-response.json';

export default class TagParser {
  static parserTagResponse(data: any): GetTagByIdResponseDTO {
    return getTagResponse;
  }

  static parserAllTagsResponse(data: any): GetTagByIdResponseDTO[] {
    return getAllTagsResponse;
  }
}
