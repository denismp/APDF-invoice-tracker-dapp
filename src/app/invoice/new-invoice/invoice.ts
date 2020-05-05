export class Invoice {
    public invoiceNumber: number;
    public netTerms: number;
    public numberHours: number;
    public amount: string;
    public timesheetEndDate: number;
    public invoiceSentDate: number;
    public due30DaysDate: number;
    public due60DaysDate: number;
    public due90DaysDate: number;
    public due120DaysDate: number;
    public datePmtReceived: number;
  constructor() {  }

}

// struct Invoice {
//   uint256 invoiceNumber;
//   uint256 netTerms; // 30, 60 90, 120 days net
//   uint256 numberHours;
//   string amount;
//   uint256 timesheetEndDate;
//   uint256 invoiceSentDate;
//   uint256 due30DaysDate;
//   uint256 due60DaysDate;
//   uint256 due90DaysDate;
//   uint256 due120DaysDate;
//   uint256 datePmtReceived;
// }
