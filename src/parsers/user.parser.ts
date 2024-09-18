import { GetUserByIdResponseDTO } from "@/contracts/dtos/request/user-request.dto";

export default class UserParser {
    static parserUserResponse(data: any): GetUserByIdResponseDTO {
        return data;
    }
}