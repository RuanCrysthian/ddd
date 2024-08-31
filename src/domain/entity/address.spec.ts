import Address from "./address";

describe("Address entity test", () => {
  it("should throw error when street is empty", () => {
    expect(() => new Address("", 1, "Zipcode 1", "City 1")).toThrow(
      "Street is required"
    );
  });

  it("should throw error when number is empty", () => {
    expect(() => new Address("Street 1", 0, "Zipcode 1", "City 1")).toThrow(
      "Number is required"
    );
  });

  it("should throw error when zip is empty", () => {
    expect(() => new Address("Street 1", 1, "", "City 1")).toThrow(
      "Zip is required"
    );
  });

  it("should throw error when city is empty", () => {
    expect(() => new Address("Street 1", 1, "Zipcode 1", "")).toThrow(
      "City is required"
    );
  });
});
