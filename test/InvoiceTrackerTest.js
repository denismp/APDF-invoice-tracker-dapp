const InvoiceTracker = artifacts.require("InvoiceTracker");
const utils = require("./utils.js");
const truffleAssert = require('truffle-assertions');

contract("InvoiceTracker", async accounts => {

  let invoiceTracker;
  beforeEach(async () => {
    invoiceTracker = await InvoiceTracker.new();
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

  // it('javascript test add a client', async () => {
  //   let clientID = "0x874390a3787ef36bcd255de00f47f2dc34f70d95";
  //   const result = await invoiceTracker.addClient(clientID, "test");
  //   truffleAssert.prettyPrintEmittedEvents(result);
  //   truffleAssert.eventEmitted(result, 'addClientEvent', (event) => {
  //     console.log("event._clientID=" + event._clientID.toUpperCase());
  //     console.log("       clientID=" + clientID.toUpperCase());
  //     const myequal = event._clientID.toUpperCase() === clientID.toUpperCase();
  //     console.log("DEBUG:" + myequal);
  //     return event._clientID.toUpperCase() == clientID.toUpperCase() && event._name === "test";
  //   });
  // });

  it('javascript test add an invoice', async () => {
    const count = await addInvoice(1);
    assert.equal(count, 1);
  });

  it('javascript test get invoice numbers', async () => {
    let count = await addInvoice(1);
    assert.equal(count, 1);
    count = await addInvoice(2);
    assert.equal(count, 2);
    //const result = await debug(invoiceTracker.getInvoiceNumbers("test"));
    const result = await invoiceTracker.getInvoiceNumbers("test");
    console.log("invoice numbers=" + result);
  });

  it('javascript test get invoice', async () => {
    let count = await addInvoice(1);
    assert.equal(count, 1);
    const result = await debug(invoiceTracker.getInvoice("test", 0));
    console.log("invoice number=" + result.invoiceNumber);
    console.log("invoice netTerms=" + result.netTerms);
    //truffleAssert.prettyPrintEmittedEvents(result);
  });

  async function addInvoice(_invoiceNumber) {
    let clientID = "0x874390a3787ef36bcd255de00f47f2dc34f70d95";
    const now = Math.floor((new Date()).getTime() / 1000);
    const result = await invoiceTracker.addInvoice(
      "test",
      _invoiceNumber,
      30,
      80,
      "2000.50",
      now,
      now,
      now,
      now,
      now,
      now,
      now
    );
    // await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000) // 5 sec
    truffleAssert.prettyPrintEmittedEvents(result);
    // truffleAssert.eventEmitted(result, 'addInvoiceEvent', (event) => {
    //   console.log("event._invoiceNumber=" + event._invoiceNumber);
    //   // console.log("       clientID=" + clientID.toUpperCase());
    //   const myequal = parseInt(event._invoiceNumber) === 1;
    //   console.log("DEBUG:" + myequal);
    //   return event._clientName === "test" &&
    //     parseInt(event._invoiceNumber) === 1 &&
    //     parseInt(event._netTerms) === 30 &&
    //     parseInt(event._numberHours) === 80 &&
    //     event._amount === "2000.50"
    //     ;
    // });
    const count = await invoiceTracker.getInvoiceCount("test");
    console.log("Invoice count=" + count);
    return count;
  }
  // it('javascript test getInvoiceCount', async () => {
  //   const now = Math.floor((new Date()).getTime() / 1000);
  //   const result = await invoiceTracker.addInvoice(
  //     "test",
  //     1,
  //     30,
  //     80,
  //     "2000.50",
  //     now,
  //     now,
  //     now,
  //     now,
  //     now,
  //     now,
  //     now
  //   );
  //   truffleAssert.prettyPrintEmittedEvents(result);
  //   const count = await invoiceTracker.getInvoiceCount("test");
  //   console.log("count=" + count);
  //   assert.equal(count,1);
  //   //truffleAssert.prettyPrintEmittedEvents(result);
  // });
});
