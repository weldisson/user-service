import { User } from "./Users";

describe("User", () => {
  it("should create a user instance with provided values", () => {
    const name = "John Doe";
    const email = "john@example.com";
    const phone = "123-456-7890";
    const document = "123456789";

    const user = new User(name, email, phone, document);

    expect(user.getName()).toBe(name);
    expect(user.getEmail()).toBe(email);
    expect(user.getPhone()).toBe(phone);
    expect(user.getDocument()).toBe(document);
  });

  it("should create a user with default values when document is not provided", () => {
    const name = "Jane Doe";
    const email = "jane@example.com";
    const phone = "987-654-3210";

    const user = new User(name, email, phone);

    expect(user.getName()).toBe(name);
    expect(user.getEmail()).toBe(email);
    expect(user.getPhone()).toBe(phone);
    expect(user.getDocument()).toBeUndefined();
  });

  it("should create a user with a generated ID and createdAt date", () => {
    const name = "Alice";
    const email = "alice@example.com";
    const phone = "555-555-5555";

    const user = new User(name, email, phone);

    expect(user.getId()).toBeDefined();
    expect(user.getCreatedAt()).toBeDefined();
  });

  it("should set and get the user's ID", () => {
    const user = new User("Bob", "bob@example.com", "123-123-1234");

    const newId = "new-id";
    user.setId(newId);

    expect(user.getId()).toBe(newId);
  });

  it("should set and get the user's createdAt date", () => {
    const user = new User("Eve", "eve@example.com", "987-987-9876");

    const newCreatedAt = "2023-09-07T12:34:56Z";
    user.setCreatedAt(newCreatedAt);

    expect(user.getCreatedAt()).toBe(newCreatedAt);
  });

  it("should create a user from a CreateUserRequest object", () => {
    const request = {
      name: "Carl",
      email: "carl@example.com",
      phone: "567-567-5678",
      document: "987654321",
    };

    const user = User.create(request);

    expect(user.getName()).toBe(request.name);
    expect(user.getEmail()).toBe(request.email);
    expect(user.getPhone()).toBe(request.phone);
    expect(user.getDocument()).toBe(request.document);
  });
});
