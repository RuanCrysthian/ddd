import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, custumerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = custumerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) throw new Error("Id is required");
    if (this._customerId.length === 0)
      throw new Error("CustumerId is required");
    if (this._items.length === 0)
      throw new Error("Items quantity must be greater than zero");
    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  addItem(item: OrderItem): void {
    this._items.push(item);
    this._total = this.total();
  }

  removeItem(id: string): void {
    this._items = this._items.filter((item) => item.id !== id);
    this._total = this.total();
  }
}
