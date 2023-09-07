import { CreateUserUseCase } from "./CreateUserUseCase";
import UserRepository from "../../../infrastructure/users/UserRepository";
import { CreateUserRequest } from "../../../presentation/users/api/requests/CreateUserRequest";

describe("CreateUserUseCase", () => {
  let userRepository: UserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepository("user-table");
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it("should throw an error if user already exists", async () => {
    const request: CreateUserRequest = {
      name: "John",
      email: "john.due@mail.com",
      phone: "99994444",
      document: "55533322212",
    };

    userRepository.findByEmail = jest.fn().mockResolvedValue(true);

    await expect(createUserUseCase.create(request)).rejects.toThrow(
      `User with request: ${request.email} already created`
    );
  });

  it("should create a new user if user does not exist", async () => {
    const request: CreateUserRequest = {
      name: "John",
      email: "john.due@mail.com",
      phone: "99994444",
      document: "55533322212",
    };
    const newUser = {
      id: "1",
      name: "John",
      email: "john.due@mail.com",
      phone: "99994444",
      document: "55533322212",
    };

    userRepository.findByEmail = jest.fn().mockResolvedValue(null);
    userRepository.add = jest.fn().mockResolvedValue(newUser);

    const result = await createUserUseCase.create(request);

    expect(result).toEqual(newUser);
  });
});
