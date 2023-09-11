import UserRepository from "../../../infrastructure/repository/users/UserRepository";

export class GetUserUseCase {
  private repository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async getUser(email: string): Promise<any> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      console.log(`User with request: ${email} not founded`);
      throw Error(`User with request: ${email} not founded`);
    }

    return user;
  }
}
