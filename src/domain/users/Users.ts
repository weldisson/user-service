import { v4 as uuid } from "uuid";
import { CreateUserRequest } from "../../presentation/users/api/requests/CreateUserRequest";
import { getDayTimeFormated } from "../../infrastructure/utils/DateUtils";

export class User {
  private id: string;
  private readonly name: string;
  private readonly email: string;
  private readonly phone: string;
  private readonly document?: string;
  private createdAt: string;

  constructor(name: string, email: string, phone: string, document?: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.document = document;
    this.createdAt = getDayTimeFormated();
    this.id = uuid();
  }

  public static create(request: CreateUserRequest) {
    return new User(
      request.name,
      request.email,
      request.phone,
      request?.document
    );
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getPhone() {
    return this.phone;
  }

  public getDocument() {
    return this.document;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public setCreatedAt(createdAt: string) {
    this.createdAt = createdAt;
  }
}
