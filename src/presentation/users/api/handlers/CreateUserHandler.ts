import { ValidationErrorResponse } from "../validator/ValidationErrorResponse";
import { CreateUserValidator } from "../validator/CreateUserValidator";
import { CreateUserRequest } from "../requests/CreateUserRequest";
import { CreateUserUseCase } from "../../../../application/users/usecase/CreateUserUseCase";
import UserRepository from "../../../../infrastructure/users/UserRepository";

export const CreateUserHandler = async (event: any) => {
  console.log(`Starting execution with event ${JSON.stringify(event)}`);

  const data = JSON.parse(event?.body);
  const { error, value } = CreateUserValidator.validate(data);

  if (error !== undefined) {
    console.log(error.details);

    const errorResponse = new ValidationErrorResponse(error);

    return {
      statusCode: 400,
      body: JSON.stringify(errorResponse),
    };
  }
  const requestBody: CreateUserRequest = value;

  try {
    const userRepository = new UserRepository(process.env.USER_TABLE);
    const useCase = new CreateUserUseCase(userRepository);

    const userCreated = await useCase.create(requestBody);

    return {
      statusCode: 201,
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
