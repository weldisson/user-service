import { GetUserHandler } from "./GetUserHandler";
import { GetUserValidator } from "../validator/GetUserValidator";
import { ValidationErrorResponse } from "../validator/ValidationErrorResponse";
import { GetUserUseCase } from "../../../../application/users/usecase/GetUserUseCase";
jest.mock("../validator/GetUserValidator");
jest.mock("../validator/ValidationErrorResponse");
jest.mock("../../../../application/users/usecase/GetUserUseCase");

describe("GetUserHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return a 200 response if valid input", async () => {
    (GetUserValidator.validate as jest.Mock).mockReturnValue({
      error: undefined,
      value: {},
    });
    const event = {
      queryStringParameters: JSON.stringify({
        email: "user@example.com",
      }),
    };

    const mockUserResult = {
      id: "123",
      email: "user@example.com",
      name: "User",
      document: "12345678910",
      createdAt: "2021-01-01T00:00:00.000Z",
    };

    (GetUserUseCase.prototype.getUser as jest.Mock).mockResolvedValue(
      mockUserResult
    );
    const response = await GetUserHandler(event);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(mockUserResult));
  });

  it("should return a 400 error if validation fails", async () => {
    const mockError = { details: "mock error" };

    (GetUserValidator.validate as jest.Mock).mockReturnValue({
      error: mockError,
    });

    const mockErrorResponse = { errors: [] };

    (ValidationErrorResponse as jest.Mock).mockImplementation(
      () => mockErrorResponse
    );

    const event = {
      queryStringParameters: JSON.stringify({
        email: "invalid-email",
      }),
    };
    const response = await GetUserHandler(event);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(JSON.stringify({ errors: [] }));
  });

  it("should return a 500 error if an exception is thrown", async () => {
    (GetUserValidator.validate as jest.Mock).mockReturnValue({
      error: undefined,
      value: {},
    });
    (GetUserUseCase.prototype.getUser as jest.Mock).mockRejectedValue(
      new Error("mock error")
    );

    const event = {
      queryStringParameters: JSON.stringify({
        email: "user@example.com",
      }),
    };

    const response = await GetUserHandler(event);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(
      JSON.stringify({
        message: "Lambda has errors",
        error: "mock error",
      })
    );
  });
});
