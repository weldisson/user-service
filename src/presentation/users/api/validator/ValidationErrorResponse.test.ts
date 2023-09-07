import {
  ValidationErrorResponse,
  ErrorResponse,
} from "./ValidationErrorResponse";
import { ValidationError } from "joi";

describe("ValidationErrorResponse", () => {
  it("should create a ValidationErrorResponse instance with validation errors", () => {
    const validationErrors: ValidationError = {
      details: [
        {
          message: "Validation error 1",
          path: ["field1"],
          type: "any",
          context: { key: "field1" },
        },
        {
          message: "Validation error 2",
          path: ["field2"],
          type: "any",
          context: { key: "field2" },
        },
      ],
    } as ValidationError;

    const validationErrorResponse = new ValidationErrorResponse(
      validationErrors
    );

    expect(validationErrorResponse.errors).toHaveLength(2);
    expect(validationErrorResponse.errors[0]).toBeInstanceOf(ErrorResponse);
    expect(validationErrorResponse.errors[0].message).toBe(
      "Validation error 1"
    );
    expect(validationErrorResponse.errors[0].field).toBe("field1");
    expect(validationErrorResponse.errors[1]).toBeInstanceOf(ErrorResponse);
    expect(validationErrorResponse.errors[1].message).toBe(
      "Validation error 2"
    );
    expect(validationErrorResponse.errors[1].field).toBe("field2");
  });

  it("should create an empty ValidationErrorResponse instance with no validation errors", () => {
    const validationErrorResponse = new ValidationErrorResponse();

    expect(validationErrorResponse.errors).toHaveLength(0);
  });
});

describe("ErrorResponse", () => {
  it("should create an ErrorResponse instance with a message and field", () => {
    const message = "Error message";
    const field = "errorField";

    const errorResponse = new ErrorResponse(message, field);

    expect(errorResponse.message).toBe(message);
    expect(errorResponse.field).toBe(field);
  });

  it("should create an ErrorResponse instance with a message and no field", () => {
    const message = "Error message";

    const errorResponse = new ErrorResponse(message);

    expect(errorResponse.message).toBe(message);
    expect(errorResponse.field).toBeUndefined();
  });
});
