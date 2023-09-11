import { GetUserUseCase } from "./GetUserUseCase";
import UserRepository from "../../../infrastructure/repository/users/UserRepository";

describe("GetUserUseCase", () => {
  let userRepository: UserRepository;
  let getUserUseCase: GetUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepository("user-table");
    getUserUseCase = new GetUserUseCase(userRepository);
  });

  it("should throw an error if user is not found", async () => {
    const userEmail = "nonexistent@example.com";

    userRepository.findByEmail = jest.fn().mockResolvedValue(null);

    await expect(getUserUseCase.getUser(userEmail)).rejects.toThrow(
      `User with request: ${userEmail} not found`
    );
  });

  it("should return user if found", async () => {
    const userEmail = "existing@example.com";
    const existingUser = {
      id: "1",
      name: "John",
      email: "existing@example.com",
      phone: "99994444",
      document: "55533322212",
    };

    userRepository.findByEmail = jest.fn().mockResolvedValue(existingUser);

    const result = await getUserUseCase.getUser(userEmail);

    expect(result).toEqual(existingUser);
  });
});
