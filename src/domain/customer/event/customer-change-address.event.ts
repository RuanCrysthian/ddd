import EventInterface from "../../@shared/event/event.interface";

interface Address {
  street: string;
  number: number;
  city: string;
  zip: string;
}

interface CustomerChangeAddressEventData {
  customer: {
    id: string;
    name: string;
    newAddress: Address;
  };
}

export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: CustomerChangeAddressEventData;

  constructor(eventData: CustomerChangeAddressEventData) {
    this.dataTimeOccured = new Date();
    this.eventData = eventData;
  }
}
