import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from '../new-invoice/invoice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {
  //@ViewChild('dp') dp: NgbDatepicker;
  dateModel: NgbDateStruct;
  //date: { year: number, month: number, day: number };
  submitted = false;
  model = new Invoice();
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
    this.model.invoiceNumber = form.controls['invoiceNumber'].value;
    //TODO convert timesheetend to the number of seconds since 1970
    let _date = new Date();
    _date.setDate(form.controls.datepmtreceived.value.day);
    _date.setMonth(form.controls.datepmtreceived.value.month - 1);
    _date.setFullYear(form.controls.datepmtreceived.value.year);
    this.model.rDatePmtReceived = _date;
    this.model.datePmtReceived = _date.getTime();
    this.model.sDatePmtReceived = _date.toDateString();
    console.log("rdate=" + this.model.rDatePmtReceived);
    console.log("sdate=" + this.model.sDatePmtReceived);
    console.log("time=" + this.model.datePmtReceived);
    console.log('date=' + form.controls.datepmtreceived.value.year + '-' + form.controls.datepmtreceived.value.month + '-' + form.controls.datepmtreceived.value.day);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(clientForm)}}
  showFormControls(form: any) {
    let rVal: string = "";
    if (form !== undefined) {
      if (form.controls['invoiceNumber'] !== undefined) {
        //console.log('Invoice Number:' + form.controls['invoiceNumber'].value);
        rVal =
          'Client Name: ' + form.controls['clientName'].value +
          ', Invoice Number: ' + form.controls['invoiceNumber'].value;
          //'Payment Date: '  + form.controls['datepmtreceived'].value;
        console.log(rVal);
      }
    }
    return rVal;
  }


  // navigateTimeSheetEndDate(event) {
  //   this.date = event.next;
  // }

}
