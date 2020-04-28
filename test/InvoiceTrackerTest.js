const InvoiceTracker = artifacts.require("InvoiceTracker");
const utils = require("./utils.js");
const truffleAssert = require('truffle-assertions');

contract("InvoiceTracker", async accounts => {

  let invoiceTracker;
  beforeEach(async () => {
    invoiceTracker = await InvoiceTracker.new();
  });

  it('javascript test add a client', async () => {
    let clientID = "0x874390a3787ef36bcd255de00f47f2dc34f70d95";
    const result = await invoiceTracker.addClient(clientID, "test");
    truffleAssert.prettyPrintEmittedEvents(result);
    truffleAssert.eventEmitted(result, 'addClientEvent', (event) => {
      console.log("event._clientID=" + event._clientID.toUpperCase());
      console.log("       clientID=" + clientID.toUpperCase());
      const myequal = event._clientID.toUpperCase() === clientID.toUpperCase();
      console.log("DEBUG:" + myequal);
      return event._clientID.toUpperCase() == clientID.toUpperCase() && event._name === "test";
    });
  });
});
