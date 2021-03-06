import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from '../new-invoice/invoice';
import { NgForm } from '@angular/forms';
import { InvoiceServiceService } from 'src/app/services/invoice-service.service';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css']
})
export class UpdateInvoiceComponent implements OnInit {
  //@ViewChild('dp') dp: NgbDatepicker;
  public dateModel: NgbDateStruct;
  public privateKey: string;
  //date: { year: number, month: number, day: number };
  public submitted = false;
  public model = new Invoice();
  public sdatePmt: string;

  constructor(public formatter: NgbDateParserFormatter, private invoiceService: InvoiceServiceService) { }

  public ngOnInit(): void {
  }

  public newInvoice() {
    this.submitted = false;
    this.model = new Invoice();
  }
  //datePmtReceived
  public onSubmit(form: NgForm) {
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
    this.model.datePmtReceived = Math.round(_date.getTime() / 1000);
    this.model.sDatePmtReceived = _date.toDateString();
    this.sdatePmt = _date.toDateString();
    console.log("rdate=" + this.model.rDatePmtReceived);
    console.log("sdate=" + this.model.sDatePmtReceived);
    console.log("time=" + this.model.datePmtReceived);
    console.log('date=' + form.controls.datepmtreceived.value.year + '-' + form.controls.datepmtreceived.value.month + '-' + form.controls.datepmtreceived.value.day);
    console.log(this.model);
    // TODO: Here we need to call the updateInvoice() on the solidity contract.
    this.invoiceService.updateInvoice( this.model.clientName, this.model.invoiceNumber, this.model.datePmtReceived)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // TODO: Remove this when we're done
  public get diagnostic() { return JSON.stringify(this.model); }

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(clientForm)}}
  public showFormControls(form: any) {
    let rVal: string = "";
    if (form !== undefined) {
      if (form.controls['invoiceNumber'] !== undefined) {
        //console.log('Invoice Number:' + form.controls['invoiceNumber'].value);
        rVal =
          'Client Name: ' + form.controls['clientName'].value +
          ', Invoice Number: ' + form.controls['invoiceNumber'].value;
          //'Payment Date: '  + form.controls['datepmtreceived'].value;
        //console.log(rVal);
      }
    }
    return rVal;
  }

  // navigateTimeSheetEndDate(event) {
  //   this.date = event.next;
  // }

}
