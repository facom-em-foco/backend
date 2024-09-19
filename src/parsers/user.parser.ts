import { LoginResponseDTO } from '@/contracts/dtos/response/auth-response.dto';
import { GetUserByIdResponseDTO } from '@/contracts/dtos/response/user-response.dto';
import GetUserResponse from '@/contracts/mocks/get-user-info-response.json';

export default class UserParser {
  static parserUserResponse(
    data: any,
  ): GetUserByIdResponseDTO | LoginResponseDTO {
    return GetUserResponse;
  }
}
