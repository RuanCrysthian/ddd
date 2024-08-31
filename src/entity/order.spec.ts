import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "1", []);
    }).toThrow("Id is required");
  });

  it("should throw error when custumerId is empty", () => {
    expect(() => {
      let order = new Order("1", "", []);
    }).toThrow("Id is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      const order = new Order("1", "1", []);
    }).toThrow("Items quantity must be greater than zero");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "p1", "item 1", 10, 2);
    const item2 = new OrderItem("2", "p2", "item 2", 20, 3);
    const order = new Order("1", "1", [item, item2]);
    expect(order.total()).toBe(80);
  });

  it("should throw error if the item quantity is greater than zero", () => {
    expect(() => {
      const item = new OrderItem("1", "p1", "item 1", 10, 0);
    }).toThrow("Quantity must be greater than zero");
  });
});
