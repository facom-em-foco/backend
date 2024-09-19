import { LoginRequestDTO } from '@/contracts/dtos/request/auth-request.dto';
import { LoginResponseDTO } from '@/contracts/dtos/response/auth-response.dto';
import UserParser from '@/parsers/user.parser';

export default class AuthService {
  async login(data: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { parserUserResponse } = UserParser;

    return parserUserResponse(data);
  }
}
