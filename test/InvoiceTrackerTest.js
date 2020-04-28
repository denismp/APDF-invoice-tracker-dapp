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
    const results = await invoiceTracker.addClient(clientID,"test");
    truffleAssert.prettyPrintEmittedEvents(results);
    assert.isTrue(true);
  });
});
