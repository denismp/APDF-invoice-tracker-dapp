import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from 'src/app/invoice/new-invoice/invoice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
    //@ViewChild('dp') dp: NgbDatepicker;
    dateModel: NgbDateStruct;
    //date: { year: number, month: number, day: number };
    submitted = false;
    model = new Invoice();
    sdatePmt: string;
    constructor(public formatter: NgbDateParserFormatter) { }

    ngOnInit(): void {
    }

    newInvoice() {
      this.submitted = false;
      this.model = new Invoice();
    }
    //datePmtReceived
    onSubmit(form: NgForm) {
      console.log(form);
      this.submitted = true;
      this.model.clientName = form.controls['clientName'].value;
      console.log(this.model);
      // TODO: Here we need to call the updateInvoice() on the solidity contract.
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }

    // Reveal in html:
    //   Name via form.controls = {{showFormControls(clientForm)}}
    showFormControls(form: any) {
      let rVal: string = "";
      if (form !== undefined) {
        if (form.controls['clientName'] !== undefined) {
          //console.log('Invoice Number:' + form.controls['invoiceNumber'].value);
          rVal =
            'Client Name: ' + form.controls['clientName'].value;
          console.log(rVal);
        }
      }
      return rVal;
    }


    // navigateTimeSheetEndDate(event) {
    //   this.date = event.next;
    // }
}
