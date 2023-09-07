import { getDayTimeFormated } from "./DateUtils";

describe("getDayTimeFormated", () => {
  it("should return the current date and time in the desired format", () => {
    const result = getDayTimeFormated();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });
});
