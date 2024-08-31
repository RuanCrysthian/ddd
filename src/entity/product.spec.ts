import Product from "./product";

describe("Product unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Product 1", 100);
    }).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("1", "", 100);
    }).toThrow("Name is required");
  });

  it("should throw error when price is negative", () => {
    expect(() => {
      let product = new Product("1", "Product 1", -100);
    }).toThrow("Price must be greater than 0");
  });

  it("should change name", () => {
    let product = new Product("1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    let product = new Product("1", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
