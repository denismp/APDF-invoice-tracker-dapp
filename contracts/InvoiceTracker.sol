pragma solidity 0.6.6;

import "./Owned.sol";


/// @title Invoice Tracking contract
/// @author Denis M. Putnam
/// @notice This contract tracks invoices for payment
/// @dev Use at your own risk.
contract InvoiceTracker is Owned {

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
    /// @notice map the name of the client to invoices. this isa one to many mapping.
    mapping(string => Invoice[]) private clientNameInvoiceMap;
    /// @notice map the name of the client to an invoice count
    mapping(string => uint256) private clientNameInvoiceCountMap;

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
        clientNameInvoiceCountMap[_name] = 0;
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
        for (uint256 i = 0; i < clientNameInvoiceCountMap[_clientName]; i++) {
            // if (_invoiceNumber == clientInvoiceMap[_clientName][i]) {
            //     return false;
            // }
            if (_invoiceNumber == clientNameInvoiceMap[_clientName][i].invoiceNumber) {
                return false;
            }
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
        Invoice memory newInvoice;
        newInvoice.invoiceNumber = _invoiceNumber;
        newInvoice.netTerms = _netTerms;
        newInvoice.numberHours = _numberHours;
        newInvoice.amount = _amount;
        newInvoice.timesheetEndDate = _timesheetEndDate;
        newInvoice.invoiceSentDate = _invoiceSentDate;
        newInvoice.due30DaysDate = _due30DaysDate;
        newInvoice.due60DaysDate = _due60DaysDate;
        newInvoice.due90DaysDate = _due90DaysDate;
        newInvoice.due120DaysDate = _due120DaysDate;
        newInvoice.datePmtReceived = _datePmtReceived;
        clientNameInvoiceMap[_clientName].push(newInvoice);

        incremmentInvoiceCount(_clientName);
        //clientNameInvoiceCountMap[_clientName] += 1;

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

    function incremmentInvoiceCount(string memory _clientName) private {
        clientNameInvoiceCountMap[_clientName] += 1;
    }

    /// @author Denis M. Putnam
    /// @notice Get the count of invoices associated with the given client name
    /// @param _clientName name of the client
    /// @dev no other details.
    function getInvoiceCount(string memory _clientName)
        public
        view
        returns (uint256 count)
    {
        count = clientNameInvoiceCountMap[_clientName];
    }

    /// @author Denis M. Putnam
    /// @notice Get the list of invoice numbers as a string for the given client name.
    /// @param _clientName name of the client
    /// @dev returned string is a comma separated string of invoice numbers.  The comma is also the end of the string if no other values appear.
    function getInvoiceNumbers(string memory _clientName)
        public
        view
        returns (string memory)
    {
        string memory rVal = "";
        for(uint256 i = 0; i < clientNameInvoiceCountMap[_clientName]; i++) {
          rVal = string(abi.encodePacked(rVal, clientNameInvoiceMap[_clientName][i].invoiceNumber));
          rVal = string(abi.encodePacked(rVal, ",")); // comma serves as token separator and end of string.
        }
    }

    // function append(
    //     string memory a,
    //     string memory b,
    //     string memory c,
    //     string memory d,
    //     string memory e
    // ) internal pure returns (string memory) {
    //     return string(abi.encodePacked(a, b, c, d, e));
    // }
}
