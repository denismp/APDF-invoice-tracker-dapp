const InvoiceTracker = artifacts.require("InvoiceTracker");
const utils = require("./utils.js");

contract("InvoiceTracker", async accounts => {

  let invoiceTracker;
  beforeEach(async () => {
    invoiceTracker = await InvoiceTracker.new();
  });

  it('javascript test', async () => {
    assert.isTrue(true);
  });
});
