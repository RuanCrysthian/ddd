import Address from "../entity/address";
import Customer from "../entity/customer";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.constructor.name).toBe("Customer");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Street", 1, "13330-250", "São Paulo");
    const customer = CustomerFactory.createWithAddress("John Doe", address);

    expect(customer).toBeInstanceOf(Customer);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.constructor.name).toBe("Customer");
    expect(customer.Address).toBe(address);
  });
});
