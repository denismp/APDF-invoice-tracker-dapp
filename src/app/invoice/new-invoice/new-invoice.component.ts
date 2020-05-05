import { Component, OnInit } from '@angular/core';
import { Invoice } from './invoice';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
  submitted = false;
  //model = new Client('0xdd18cbfab0297cdea52b16f7ed06625dc5ff6b12', 'test');
  // public invoiceNumber: number,
  // public netTerms: number,
  // public numberHours: number,
  // public amount: string,
  // public timesheetEndDate: number,
  // public invoiceSentDate: number,
  // public due30DaysDate: number,
  // public due60DaysDate: number,
  // public due90DaysDate: number,
  // public due120DaysDate: number,
  // public datePmtReceived: number
  model = new Invoice();
  constructor() { }

  ngOnInit(): void {
  }

  newInvoice() {
    this.submitted = false;
    this.model = new Invoice();
  }

  onSubmit(form: any) {
    this.submitted = true;
    this.model.invoiceNumber = form.controls['invoiceNumber'].value;
    this.model.netTerms = form.controls['netTerms'].value;
    this.model.numberHours = form.controls['numberHours'].value;
    this.model.amount = form.controls['amount'].value;
    this.model.timesheetEndDate = form.controls['timesheetEndDate'].value;
    this.model.invoiceSentDate = form.controls['invoiceSentDate'].value;
    //TODO calc the rest of the values.
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }


  // Reveal in html:
  //   Name via form.controls = {{showFormControls(clientForm)}}
  showFormControls(form: any) {
    let rVal: string = "";
    if (form !== undefined) {
      if (form.controls['invoiceNumber'] !== undefined) {
        console.log('Invoice Number:' + form.controls['invoiceNumber'].value);
        rVal =
          'Invoice Number: ' + form.controls['invoiceNumber'].value +
          ', Net Terms: ' + form.controls['netTerms'].value;
      }
      if (form.controls['netTerms'] !== undefined) {
        console.log('Net Terms:' + form.controls['netTerms'].value);
      }
    }
    return rVal;
  }

}
