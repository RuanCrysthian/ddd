import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit test", () => {
  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "p1", "Item 1", 100, 1);
    const item2 = new OrderItem("2", "p2", "Item 2", 200, 2);

    const order = new Order("1", "c1", [item1]);
    const order2 = new Order("2", "c1", [item2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(500);
  });

  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("1", "p1", "Item 1", 10, 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should throw error when orderItem is empty", () => {
    const customer = new Customer("c1", "Customer 1");

    expect(() => OrderService.placeOrder(customer, [])).toThrow(
      "An order must have at least one item"
    );
  });
});
