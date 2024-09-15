import Address from "./address";
import Customer from "./customer";

describe("Custumer unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let custumer = new Customer("", "John");
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    // Arrage
    const customer = new Customer("123", "John");
    // Act
    customer.changeName("Jane");
    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should active customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12345-678", "São Carlos");

    customer.setAddress(address);
    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it("should deactive customer", () => {
    const customer = new Customer("1", "Customer 1");
    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrow("Address is mandatory to activate a custumer");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
