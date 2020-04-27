pragma solidity 0.6.6;

import "./Owned.sol";

/// @title Invoice Tracking contract
/// @author Denis M. Putnam
/// @notice This contract tracks invoices for payment
/// @dev Use at your own risk.
contract InvoiceTracker is Owned {
  uint256 clientIndex = 0;
  uint256 clientNameIndex = 0;

  /// @notice Invoice struct
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

  /// @notice Client struct
  struct Client {
    address clientID;
    string name;
    bool flag;
  }

  /// @notice map the name of the client to the Client struct
  mapping(string => Client) private clientMap;
  /// @notice map the name of the client to the client address
  mapping(string => address) private clientNameAddressMap;

  /// @author Denis M. Putnam
  /// @notice The constructor for this contract
  /// @dev no other details
  constructor() Owned() payable public {
  }

  event addClientEvent(address _clientID, string _name);

  /// @author Denis M. Putnam
  /// @notice Add a client to this contract.
  /// @param clientID address of the wallet of the client.
  /// @param name string with the client's name.  This needs to be unique
  /// @dev Add's a client to the clientMap and the clientNameAddressMap
  function addClient(address clientID, string memory name) public {
    clientMap[name].clientID = clientID;
    clientMap[name].name = name;
    clientMap[name].flag = true;
    clientNameAddressMap[name] = clientID;
    emit addClientEvent(clientID, name);
  }
}
