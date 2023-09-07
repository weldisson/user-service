import { User } from "../../../domain/users/Users";
import UserRepository from "../../../infrastructure/users/UserRepository";
import { CreateUserRequest } from "../../../presentation/users/api/requests/CreateUserRequest";

export class CreateUserUseCase {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async create(request: CreateUserRequest): Promise<any> {
    const UserCreated = await this.repository.findByEmail(request.email);

    if (UserCreated) {
      console.log(`User with request: ${request.email} already created`);
      throw Error(`User with request: ${request.email} already created`);
    }
    const user = new User(
      request?.name,
      request?.email,
      request?.phone,
      request?.document
    );
    const created = await this.repository.add(user);

    return created;
  }
}
