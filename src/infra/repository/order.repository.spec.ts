import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find an order by id", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    const product2 = new Product("1234", "Product 4", 20);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );
    const orderItem2 = new OrderItem(
      "2",
      product2.id,
      product2.name,
      product2.price,
      2
    );

    const order = new Order("123", "123", [orderItem, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    console.log("order", order);

    const foundOrder = await orderRepository.find(order.id);
    console.log("foundOrder", foundOrder);

    expect(foundOrder).toEqual(order);
  });

  it("should not find an order by id", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("123");
    }).rejects.toThrow("Order not found");
  });

  it("should find all orders", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    const product2 = new Product("1234", "Product 4", 20);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );
    const orderItem2 = new OrderItem(
      "2",
      product2.id,
      product2.name,
      product2.price,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const order2 = new Order("1234", "1234", [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();
    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order);
    expect(orders).toContainEqual(order2);
    expect(orders).toEqual([order, order2]);
  });
});
