import EventInterface from "../@shared/event.interface";

interface CustomerCreatedEventData {
  customer: {
    id: string;
    name: string;
    active: boolean;
  };
}

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: CustomerCreatedEventData;

  constructor(eventData: CustomerCreatedEventData) {
    this.dataTimeOccured = new Date();
    this.eventData = eventData;
  }
}
