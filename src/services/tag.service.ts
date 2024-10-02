import { ErrorNotification } from '@/contracts/api/error-notification';
import { GetTagByIdRequestDTO } from '@/contracts/dtos/request/tags-request.dto';
import { GetTagByIdResponseDTO } from '@/contracts/dtos/response/tags-response.dto';
import { Tag } from '@/entities/Tag';
import { ErrorKeysEnum } from '@/enums/error-keys.enum';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import TagParser from '@/parsers/tag-parser';
import { TagRepository } from '@/repositories/tag.repository';

export default class TagService {
  private tagRepository: TagRepository;

  constructor() {
    this.tagRepository = new TagRepository();
  }

  async getById(data: GetTagByIdRequestDTO): Promise<GetTagByIdResponseDTO> {
    const { parserTagResponse } = TagParser;

    return parserTagResponse(data);
  }

  async getAll(data: GetTagByIdRequestDTO): Promise<GetTagByIdResponseDTO[]> {
    const { parserAllTagsResponse } = TagParser;

    return parserAllTagsResponse(data);
  }

  async validateTags(data: string[]): Promise<Tag[]> {
    const foundTags = await this.tagRepository.findByTitles(data);

    if (foundTags?.length === 0) {
      throw new ErrorNotification({
        message: 'No tags were found!',
        errorKey: ErrorKeysEnum.TAG_NOT_FOUND,
        errorDescription:
          'A tag search was carried out for a set of titles and no tags were found',
        status: HttpStatusCode.NOT_FOUND,
      });
    }

    return foundTags;
  }
}
