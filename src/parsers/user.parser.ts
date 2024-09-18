import { GetUserByIdResponseDTO } from '@/contracts/dtos/response/user-response.dto';
import GetUserResponse from '@/contracts/mocks/get-user-info-response.json';

export default class UserParser {
  static parserUserResponse(data: any): GetUserByIdResponseDTO {
    return GetUserResponse;
  }
}
