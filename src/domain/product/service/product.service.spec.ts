import Product from "../entity/product";
import ProductService from "../entity/product.service";

describe("Product service unit test", () => {
  it("should change the prices og all products", () => {
    const products = [
      new Product("1", "Product 1", 10),
      new Product("2", "Product 2", 20),
    ];
    ProductService.increasePrices(products, 100);
    expect(products[0].price).toBe(20);
    expect(products[1].price).toBe(40);
  });
});
