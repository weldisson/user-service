import { ValidationErrorResponse } from "../validator/ValidationErrorResponse";
import { GetUserValidator } from "../validator/GetUserValidator";
import { GetUserUseCase } from "../../../../application/users/usecase/GetUserUseCase";
import UserRepository from "../../../../infrastructure/repository/users/UserRepository";
import { GetUserRequest } from "../requests/GetUserRequest";

export const GetUserHandler = async (event: any) => {
  console.log(`Starting execution with event ${JSON.stringify(event)}`);
  const query = event.queryStringParameters;
  const { error, value } = GetUserValidator.validate(query);

  if (error !== undefined) {
    console.log(error.details);

    const errorResponse = new ValidationErrorResponse(error);

    return {
      statusCode: 400,
      body: JSON.stringify(errorResponse),
    };
  }
  const request: GetUserRequest = value;

  try {
    const userRepository = new UserRepository(process.env.USER_TABLE);
    const useCase = new GetUserUseCase(userRepository);

    const userCreated = await useCase.getUser(request.email);

    return {
      statusCode: 200,
      body: JSON.stringify(userCreated),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Lambda has errors",
        error: err?.message,
      }),
    };
  }
};
