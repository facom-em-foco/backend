import { GetAllTagsRequestDTO } from "@/contracts/dtos/request/tags-request.dto";
import { GetAllTagsResponseDTO } from "@/contracts/dtos/request/tags-request.dto";
import { GetTagsByIdRequestDTO } from "@/contracts/dtos/request/tags-request.dto";
import { GetTagsByIdResponseDTO } from "@/contracts/dtos/request/tags-request.dto";
import TagParser from "@/parsers/tag-parser";

export default class TagService {
    async getById(data: GetTagsByIdRequestDTO): Promise<GetTagsByIdResponseDTO> {
        const { parserTagResponse } = TagParser;

        return parserTagResponse(data);
    }

    async getAll(data: GetAllTagsRequestDTO): Promise<GetAllTagsResponseDTO> {
        const { parserTagResponse } = TagParser;

        return parserTagResponse(data);
    }
}
