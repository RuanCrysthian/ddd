import Product from "../entity/product";
import ProductB from "../entity/productB";
import ProductFactory from "./product.factory";

describe("Product Factory unit test", () => {
  it("should create a product type A", () => {
    const product = ProductFactory.create("a", "product A", 1);
    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });
  it("should create a product type B", () => {
    const product = ProductFactory.create("b", "product B", 1);
    expect(product).toBeInstanceOf(ProductB);
    expect(product.id).toBeDefined();
    expect(product.name).toBe("product B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("should throw an error when creating an unsupported product type", () => {
    expect(() => ProductFactory.create("c", "product C", 1)).toThrow(
      "Product type not supported"
    );
  });
});
