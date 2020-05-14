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

    modifier onlyOwner() {
        require(msg.sender == getCurrentOwner());
        _;
    }

    /// @author Denis M. Putnam
    /// @notice Add a client to this contract.
    /// @param _clientID address of the wallet of the client.
    /// @param _name string with the client's name.  This needs to be unique
    /// @dev Add's a client to the clientMap and the clientNameAddressMap
    function addClient(address _clientID, string memory _name)
        public
        onlyOwner()
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
            if (
                _invoiceNumber ==
                clientNameInvoiceMap[_clientName][i].invoiceNumber
            ) {
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

    event updateInvoiceEvent(
        string _clientName,
        uint256 _invoiceNumber,
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
        uint256 _due120DaysDate
    ) public onlyOwner() noDupInvoice(_clientName, _invoiceSentDate) {
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
        clientNameInvoiceMap[_clientName].push(newInvoice);

        incremmentInvoiceCount(_clientName);

        emit addInvoiceEvent(
            _clientName,
            newInvoice.invoiceNumber,
            newInvoice.netTerms,
            newInvoice.numberHours,
            newInvoice.amount,
            newInvoice.timesheetEndDate,
            newInvoice.invoiceSentDate,
            newInvoice.due30DaysDate,
            newInvoice.due60DaysDate,
            newInvoice.due90DaysDate,
            newInvoice.due120DaysDate,
            newInvoice.datePmtReceived
        );

        // emit addInvoiceEvent(
        //     _clientName,
        //     clientNameInvoiceMap[_clientName][0].invoiceNumber,
        //     clientNameInvoiceMap[_clientName][0].netTerms,
        //     clientNameInvoiceMap[_clientName][0].numberHours,
        //     clientNameInvoiceMap[_clientName][0].amount,
        //     clientNameInvoiceMap[_clientName][0].timesheetEndDate,
        //     clientNameInvoiceMap[_clientName][0].invoiceSentDate,
        //     clientNameInvoiceMap[_clientName][0].due30DaysDate,
        //     clientNameInvoiceMap[_clientName][0].due60DaysDate,
        //     clientNameInvoiceMap[_clientName][0].due90DaysDate,
        //     clientNameInvoiceMap[_clientName][0].due120DaysDate,
        //     clientNameInvoiceMap[_clientName][0].datePmtReceived
        // );
    }

    function incremmentInvoiceCount(string memory _clientName) private returns(uint256){
        return clientNameInvoiceCountMap[_clientName] += 1;
    }

    /// @author Denis M. Putnam
    /// @notice Get the count of invoices associated with the given client name
    /// @param _clientName name of the client
    /// @dev no other details.
    function getInvoiceCount(string memory _clientName)
        public
        view
        onlyOwner()
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
        onlyOwner()
        returns (string memory)
    {
        string memory rVal = "";
        for (uint256 i = 0; i < clientNameInvoiceCountMap[_clientName]; i++) {
            string memory tstring = uint2str(
                clientNameInvoiceMap[_clientName][i].invoiceNumber
            );
            // string tstring = string(lbytes32);
            //rVal = string(abi.encodePacked(rVal, tstring, ","));
            rVal = string(abi.encodePacked(rVal, tstring, ","));
        }
        return rVal;
    }

    modifier isInvoiceNumber(uint256 _invoiceNumber) {
        require(_invoiceNumber > 0, "Invoice number must be greater than 0");
        _;
    }

    function findInvoiceIndex(string memory _clientName, uint256 _invoiceNumber)
        private
        view
        onlyOwner()
        isInvoiceNumber(_invoiceNumber)
        returns (int256 index)
    {
        for (
            int256 i = 0;
            i < int256(clientNameInvoiceCountMap[_clientName]);
            i++
        ) {
            if (_invoiceNumber == clientNameInvoiceCountMap[_clientName]) {
                return i;
            }
        }
        return -1;
    }

    /// @author Denis M. Putnam
    /// @notice Update an invoice with the payment date
    /// @param _clientName name of the client
    /// @param _invoiceNumber invoice number being requested.
    /// @param _invoicePmtDate payment date
    /// @dev no other details
    function updateInvoice(
        string memory _clientName,
        uint256 _invoiceNumber,
        uint256 _invoicePmtDate
    ) public onlyOwner() {
        int256 _index = findInvoiceIndex(_clientName, _invoiceNumber);
        if (_index != -1) {
            Invoice memory lInvoice = clientNameInvoiceMap[_clientName][uint256(
                _index
            )];
            lInvoice.datePmtReceived = _invoicePmtDate;
            clientNameInvoiceMap[_clientName][uint256(_index)] = lInvoice;
            emit updateInvoiceEvent(
                _clientName,
                _invoiceNumber,
                _invoicePmtDate
            );
        }
    }

    /// @author Denis M. Putnam
    /// @notice Get an invoice
    /// @param _clientName name of the client
    /// @param _invoiceNumber invoice number being requested.
    /// @dev no other details
    function getInvoice(string memory _clientName, uint256 _invoiceNumber)
        public
        view
        onlyOwner()
        returns (
            uint256 invoiceNumber,
            uint256 netTerms,
            uint256 numberHours,
            string memory amount,
            uint256 timesheetEndDate,
            uint256 invoiceSentDate,
            uint256 due30DaysDate,
            uint256 due60DaysDate,
            uint256 due90DaysDate,
            uint256 due120DaysDate,
            uint256 datePmtReceived
        )
    {
        int256 _index = findInvoiceIndex(_clientName, _invoiceNumber);
        if (_index != -1) {
            Invoice memory lInvoice = clientNameInvoiceMap[_clientName][uint256(
                _index
            )];
            return (
                lInvoice.invoiceNumber,
                lInvoice.netTerms,
                lInvoice.numberHours,
                lInvoice.amount,
                lInvoice.timesheetEndDate,
                lInvoice.invoiceSentDate,
                lInvoice.due30DaysDate,
                lInvoice.due60DaysDate,
                lInvoice.due90DaysDate,
                lInvoice.due120DaysDate,
                lInvoice.datePmtReceived
            );
            // return (
            //     invoiceNumber,
            //     netTerms,
            //     numberHours,
            //     amount,
            //     timesheetEndDate,
            //     invoiceSentDate,
            //     due30DaysDate,
            //     due60DaysDate,
            //     due90DaysDate,
            //     due120DaysDate,
            //     datePmtReceived
            // );
        }
    }

    /// @author Denis M. Putnam
    /// @notice Convert a uint256 to a string.
    /// @param _i contains the uint256 value to be converted to a string.
    /// @dev This code was taken from https://github.com/provable-things/ethereum-api/blob/master/oraclizeAPI_0.5.sol
    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + (_i % 10)));
            _i /= 10;
        }
        return string(bstr);
    }
}
