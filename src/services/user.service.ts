import { GetUserByIdRequestDTO } from '@/contracts/dtos/request/user-request.dto';
import { GetUserByIdResponseDTO } from '@/contracts/dtos/response/user-response.dto';
import UserParser from '@/parsers/user.parser';

export default class UserService {
  async getById(data: GetUserByIdRequestDTO): Promise<GetUserByIdResponseDTO> {
    const { parserUserResponse } = UserParser;

    return parserUserResponse(data);
  }
}
