import { ValidationError } from "joi";

export class ValidationErrorResponse {
  public errors: ErrorResponse[];

  constructor(validationErrors?: ValidationError) {
    this.errors = validationErrors?.details.map((err) => new ErrorResponse(err.message, err.context?.key)) ?? [];
  }
}

export class ErrorResponse {
  public message: string;
  public field?: string;

  constructor(message: string, field?: string) {
    this.message = message;
    this.field = field;
  }
}
