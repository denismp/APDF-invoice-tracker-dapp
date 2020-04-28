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
        string amount;
        uint256 timesheetEndDate;
        uint256 invoiceSentDate;
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
    /// @notice map the name of the client to an invoice number
    mapping(string => uint256) private clientInvoiceMap;
    /// @notice map the name of the client to an invoice
    mapping(string => Invoice) private clientNameInvoiceMap;

    /// @author Denis M. Putnam
    /// @notice The constructor for this contract
    /// @dev no other details
    constructor() public payable Owned() {}

    event addClientEvent(address _clientID, string _name);

    /// @author Denis M. Putnam
    /// @notice Check for no client.
    /// @param _clientName name of the client.
    /// @param _clientID clients wallet address.
    /// @dev no other details.
    function isNoClient(string memory _clientName, address _clientID)
        private
        view
        returns (bool)
    {
        if (clientNameAddressMap[_clientName] == _clientID) {
            return false;
        }
        return true;
    }

    modifier noDupClient(address _clientID, string memory _clientName) {
        require(isNoClient(_clientName, _clientID), "Client already exists");
        _;
    }

    /// @author Denis M. Putnam
    /// @notice Add a client to this contract.
    /// @param _clientID address of the wallet of the client.
    /// @param _name string with the client's name.  This needs to be unique
    /// @dev Add's a client to the clientMap and the clientNameAddressMap
    function addClient(address _clientID, string memory _name)
        public
        noDupClient(_clientID, _name)
    {
        clientMap[_name].clientID = _clientID;
        clientMap[_name].name = _name;
        clientMap[_name].flag = true;
        clientNameAddressMap[_name] = _clientID;
        emit addClientEvent(_clientID, _name);
    }

    /// @author Denis M. Putnam
    /// @notice Check for no duplicate invoice.
    /// @param _clientName name of the client.
    /// @param _invoiceNumber invoice number.
    /// @dev no other details.
    function isNoDuplicateInvoice(
        string memory _clientName,
        uint256 _invoiceNumber
    ) private view returns (bool) {
        if (clientInvoiceMap[_clientName] == _invoiceNumber) {
            return false;
        }
        return true;
    }

    modifier noDupInvoice(string memory _clientName, uint256 _invoiceNumber) {
        require(
            isNoDuplicateInvoice(_clientName, _invoiceNumber),
            "Duplicate invoice"
        );
        _;
    }

    event addInvoiceEvent(
        string _clientName,
        uint256 _invoiceNumber,
        uint256 _netTerms,
        uint256 _numberHours,
        string _amount,
        uint256 _timesheetEndDate,
        uint256 _invoiceSentDate,
        uint256 _due30DaysDate,
        uint256 _due60DaysDate,
        uint256 _due90DaysDate,
        uint256 _due120DaysDate,
        uint256 _datePmtReceived
    );

    /// @author Denis M. Putnam
    /// @notice Add an invoice to track
    /// @param _clientName name of the client
    /// @param _invoiceNumber invoice number
    /// @param _netTerms net terms for 30, 60, 90, or 120 days.
    /// @param _numberHours number of hours for the timesheet.
    /// @param _amount amount in dollars.
    /// @param _timesheetEndDate timesheet end date
    /// @param _invoiceSentDate date that invoice was sent to the client.
    /// @param _due30DaysDate 30 day invoice due date
    /// @param _due60DaysDate 60 day invoice due date
    /// @param _due90DaysDate 90 day invoice due date
    /// @param _due120DaysDate 120 day invoice due date
    /// @param _datePmtReceived date of actual payment
    /// @dev Add's an invoice to be tracked.
    function addInvoice(
        string memory _clientName,
        uint256 _invoiceNumber,
        uint256 _netTerms,
        uint256 _numberHours,
        string memory _amount,
        uint256 _timesheetEndDate,
        uint256 _invoiceSentDate,
        uint256 _due30DaysDate,
        uint256 _due60DaysDate,
        uint256 _due90DaysDate,
        uint256 _due120DaysDate,
        uint256 _datePmtReceived
    ) public noDupInvoice(_clientName, _invoiceSentDate) {
        clientNameInvoiceMap[_clientName].invoiceNumber = _invoiceNumber;
        clientNameInvoiceMap[_clientName].netTerms = _netTerms;
        clientNameInvoiceMap[_clientName].numberHours = _numberHours;
        clientNameInvoiceMap[_clientName].amount = _amount;
        clientNameInvoiceMap[_clientName].timesheetEndDate = _timesheetEndDate;
        clientNameInvoiceMap[_clientName].invoiceSentDate = _invoiceSentDate;
        clientNameInvoiceMap[_clientName].due30DaysDate = _due30DaysDate;
        clientNameInvoiceMap[_clientName].due60DaysDate = _due60DaysDate;
        clientNameInvoiceMap[_clientName].due90DaysDate = _due90DaysDate;
        clientNameInvoiceMap[_clientName].due120DaysDate = _due120DaysDate;
        clientNameInvoiceMap[_clientName].datePmtReceived = _datePmtReceived;

        clientInvoiceMap[_clientName] = _invoiceNumber;
        emit addInvoiceEvent(
            _clientName,
            _invoiceNumber,
            _netTerms,
            _numberHours,
            _amount,
            _timesheetEndDate,
            _invoiceSentDate,
            _due30DaysDate,
            _due60DaysDate,
            _due90DaysDate,
            _due120DaysDate,
            _datePmtReceived
        );
    }
}
