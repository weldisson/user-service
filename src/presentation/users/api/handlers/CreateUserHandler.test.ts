import { CreateUserHandler } from "./CreateUserHandler";
import { CreateUserValidator } from "../validator/CreateUserValidator";
import { ValidationErrorResponse } from "../validator/ValidationErrorResponse";
import UserRepository from "../../../../infrastructure/repository/users/UserRepository";
import { CreateUserUseCase } from "../../../../application/users/usecase/CreateUserUseCase";

jest.mock("../validator/CreateUserValidator");
jest.mock("../validator/ValidationErrorResponse");
jest.mock("../../../../infrastructure/repository/users/UserRepository");
jest.mock("../../../../application/users/usecase/CreateUserUseCase");

describe("CreateUserHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a 201 response if user is created successfully", async () => {
    (CreateUserValidator.validate as jest.Mock).mockReturnValue({
      error: undefined,
      value: {},
    });

    const mockUserCreated = { id: "123" };
    (CreateUserUseCase.prototype.create as jest.Mock).mockResolvedValue(
      mockUserCreated
    );

    const event = { body: JSON.stringify({}) };
    const result = await CreateUserHandler(event);

    expect(result).toEqual({
      statusCode: 201,
      body: JSON.stringify(mockUserCreated),
    });
  });

  it("should return a 400 error if validation fails", async () => {
    const mockError = { details: "mock error" };
    (CreateUserValidator.validate as jest.Mock).mockReturnValue({
      error: mockError,
    });

    const mockErrorResponse = { errors: [] };
    (ValidationErrorResponse as jest.Mock).mockImplementation(
      () => mockErrorResponse
    );

    const event = { body: JSON.stringify({}) };
    const result = await CreateUserHandler(event);

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify(mockErrorResponse),
    });
  });
  it("should return a 500 error if an exception is thrown", async () => {
    (CreateUserValidator.validate as jest.Mock).mockReturnValue({
      error: undefined,
      value: {},
    });
    (CreateUserUseCase.prototype.create as jest.Mock).mockRejectedValue(
      new Error("mock error")
    );

    const event = { body: JSON.stringify({}) };
    const result = await CreateUserHandler(event);

    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: "Lambda has errors",
        error: "mock error",
      }),
    });
  });
});
