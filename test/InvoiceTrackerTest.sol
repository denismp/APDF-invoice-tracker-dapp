pragma solidity 0.6.6;

import "truffle/Assert.sol";
import "../contracts/InvoiceTracker.sol";

contract InvoiceTrackerTest {
  function testSettingOwnerAnOwnerDuringCreations() public {
    InvoiceTracker invoiceTracker = new InvoiceTracker();
    Assert.equal(invoiceTracker.getCurrentOwner(), address(this), "The owner is different from the deployer");
  }

}
