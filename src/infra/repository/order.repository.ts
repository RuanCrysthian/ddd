import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const updatedItems = entity.items.map((item) => ({
      id: item.id,
      product_id: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const itemsOnDb = await OrderItemModel.findAll({
      where: { order_id: entity.id },
    });

    for (const updatedItem of updatedItems) {
      const existingItemOnBg = itemsOnDb.find(
        (item) => item.id === updatedItem.id
      );
      if (!existingItemOnBg) {
        await OrderItemModel.create({ ...updatedItem, order_id: entity.id });
      }
    }

    for (const itemOnDb of itemsOnDb) {
      const updatedItem = updatedItems.find((item) => item.id === itemOnDb.id);
      if (!updatedItem) {
        await OrderItemModel.destroy({ where: { id: itemOnDb.id } });
      }
    }
    await OrderModel.update(
      { total: entity.total() },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const items = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.product_id,
          item.name,
          item.price,
          item.quantity
        )
    );

    return new Order(id, orderModel.customer_id, items);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    const orders = orderModels.map((orderModel) => {
      const items = orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
          )
      );

      return new Order(orderModel.id, orderModel.customer_id, items);
    });
    return orders;
  }
}
