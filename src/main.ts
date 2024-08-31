import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let custumer = new Customer("123", "Ruan Ferraz");
const address = new Address("Rua 2", 2, "12345-678", "São Carlos");

custumer.setAddress(address);
custumer.activate();

const item1 = new OrderItem("1", "item 1", 10);
const item2 = new OrderItem("2", "item 2", 15);

const order = new Order("1", "123", [item1, item2]);
