import { ErrorNotification } from '@/contracts/api/error-notification';
import { GetUserByIdRequestDTO } from '@/contracts/dtos/request/user-request.dto';
import { GetUserByIdResponseDTO } from '@/contracts/dtos/response/user-response.dto';
import { Publisher } from '@/entities/Publisher';
import { ErrorKeysEnum } from '@/enums/error-keys.enum';
import { HttpStatusCode } from '@/enums/http-status-code.enum';
import UserParser from '@/parsers/user.parser';
import { PublisherRepository } from '@/repositories/publisher.repository';
import { UserRepository } from '@/repositories/user.repository';

export default class UserService {
  private userRepository: UserRepository;
  private publisherRepository: PublisherRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.publisherRepository = new PublisherRepository();
  }

  async getById(data: GetUserByIdRequestDTO): Promise<GetUserByIdResponseDTO> {
    const { parserUserResponse } = UserParser;

    return parserUserResponse(data);
  }

  async getPublisherByEmail(email: string): Promise<Publisher> {
    const publisher = await this.publisherRepository.findByEmail(email);

    if (!publisher) {
      throw new ErrorNotification({
        message: 'Publisher not found!',
        errorKey: ErrorKeysEnum.PUBLISHER_NOT_FOUND,
        errorDescription: 'Publisher not found',
        status: HttpStatusCode.NOT_FOUND,
      });
    }

    return publisher;
  }
}
