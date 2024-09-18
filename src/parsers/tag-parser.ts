import { GetAllTagsResponseDTO } from "@/contracts/dtos/request/tags-request.dto";
import { GetTagsByIdResponseDTO } from "@/contracts/dtos/request/tags-request.dto";


export default class TagParser {
    static parserTagResponse(data: any): GetTagsByIdResponseDTO | GetAllTagsResponseDTO {
        return data;
    }
}