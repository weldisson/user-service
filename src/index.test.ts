import { createUserHandler, getUserHandler } from "./index";

jest.mock("./presentation/users/api/handlers/CreateUserHandler");
jest.mock("./presentation/users/api/handlers/GetUserHandler");

describe("index.ts", () => {
  it("should export createUserHandler", () => {
    expect(createUserHandler).toBeDefined();
  });

  it("should export getUserHandler", () => {
    expect(getUserHandler).toBeDefined();
  });

  it("should call createUserHandler when createUserHandler is invoked", async () => {
    const event = {};
    await createUserHandler(event);

    expect(createUserHandler).toHaveBeenCalled();
  });

  it("should call getUserHandler when getUserHandler is invoked", async () => {
    const event = {};

    await getUserHandler(event);

    expect(getUserHandler).toHaveBeenCalled();
  });
});
