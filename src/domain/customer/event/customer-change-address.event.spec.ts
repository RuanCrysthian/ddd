import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import SendConsoleLogChangeAddressHandler from "./handler/send-console-log-change-address.handler";

describe("Customer changed address event tests", () => {
  it("should notify the event handlers of the change of address of a customer", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogChangeAddressHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
    ).toBe(1);

    const eventPayload = {
      customer: {
        id: "123",
        name: "John Doe",
        newAddress: {
          street: "New Street",
          number: 473,
          city: "New City",
          zip: "54321",
        },
      },
    };

    const customerChangeAddressEvent = new CustomerChangeAddressEvent(
      eventPayload
    );
    eventDispatcher.notify(customerChangeAddressEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
