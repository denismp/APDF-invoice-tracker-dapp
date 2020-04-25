pragma solidity 0.6.6;

import "./Owned.sol";

/// @title Invoice Tracking contract
/// @author Denis M. Putnam
/// @notice This contract tracks invoices for payment
/// @dev Use at your own risk.
contract InvoiceTracker is Owned {
  address clientID;
  struct Invoice {
    uint256 invoiceNumber;
    uint256 netTerms; // 30, 60 90, 120 days net
    uint256 numberHours;
    uint256 amount;
    uint256 timesheetEndDate;
    uint256 invoiceSentData;
    uint256 due30DaysDate;
    uint256 due60DaysDate;
    uint256 due90DaysDate;
    uint256 due120DaysDate;
    uint256 datePmtReceived;
  }

  constructor() Owned() payable public {}
}
