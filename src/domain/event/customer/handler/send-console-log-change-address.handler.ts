import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendConsoleLogChangeAddressHandler
  implements EventHandlerInterface<CustomerChangeAddressEvent>
{
  handle(event: CustomerChangeAddressEvent): void {
    const { id, name, newAddress } = event.eventData.customer;
    console.log(
      `Customer address: ${id} - ${name} changed to: ${newAddress.street} ${newAddress.number}, ${newAddress.city} - ${newAddress.zip}`
    );
  }
}
