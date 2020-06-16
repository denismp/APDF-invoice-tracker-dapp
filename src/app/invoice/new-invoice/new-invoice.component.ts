import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice } from './invoice';
import { NgbDatepicker, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { InvoiceServiceService } from 'src/app/services/invoice-service.service';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
  //@ViewChild('dp') dp: NgbDatepicker;
  timesheetEnddateModel: NgbDateStruct;
  invoicesentDateModel: NgbDateStruct;
  //date: { year: number, month: number, day: number };
  privateKey: string;

  submitted: boolean = false;
  model: Invoice = new Invoice();
  clientName: string;
  invoiceNumber: string;
  netTerms: string;
  numberHours: string;
  amount: string;
  timesheetEndDate: string;
  invoiceSentDate: string;
  due30DaysDate: string;
  due60DaysDate: string;
  due90DaysDate: string;
  due120DaysDate: string;
  datePmtReceived: string;
  sDatePmtReceived: string;


  constructor(public formatter: NgbDateParserFormatter, private invoiceService: InvoiceServiceService) { }

  ngOnInit(): void {
  }

  newInvoice() {
    this.submitted = false;
    this.model = new Invoice();
  }

  public onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    this.model.clientName = form.controls['clientName'].value;
    this.model.invoiceNumber = form.controls['invoiceNumber'].value;
    this.model.netTerms = form.controls['netTerms'].value;
    this.model.numberHours = form.controls['numberHours'].value;
    this.model.amount = form.controls['amount'].value;
    //TODO convert timesheetend to the number of seconds since 1970
    let _date = new Date();
    _date.setDate(form.controls.timesheetend.value.day);
    _date.setMonth(form.controls.timesheetend.value.month - 1);
    _date.setFullYear(form.controls.timesheetend.value.year);
    this.model.rTimesheetEndDate = _date;
    this.model.timesheetEndDate = Math.round(_date.getTime() / 1000); // convert milliseconds to seconds for solidity time stamp.
    this.model.sTimesheetEndDate = _date.toDateString();
    console.log("rdate=" + this.model.rTimesheetEndDate);
    console.log("sdate=" + this.model.sTimesheetEndDate);
    console.log("time=" + this.model.timesheetEndDate);
    console.log('date=' + form.controls.timesheetend.value.year + '-' + form.controls.timesheetend.value.month + '-' + form.controls.timesheetend.value.day);

    _date = new Date();
    _date.setDate(form.controls.invoicesentdate.value.day);
    _date.setMonth(form.controls.invoicesentdate.value.month - 1);
    _date.setFullYear(form.controls.invoicesentdate.value.year);
    console.log('date=' + form.controls.invoicesentdate.value.year + '-' + form.controls.invoicesentdate.value.month + '-' + form.controls.invoicesentdate.value.day);
    console.log("Invoice sent date=" + _date.toDateString());
    this.model.invoiceSentDate = Math.round(_date.getTime() / 1000); // convert millseconds to seconds for solidity time stamp.

    // calc the rest of the values.
    // User the invoice sent date to calculate the other dates

    //now.setDate(now.getDate() + 30);
    let _invoiceSentTime = _date.getTime();
    const ldate: Date = new Date(_date);
    let _30days = Math.round(ldate.setDate(ldate.getDate() + 30)/1000);
    let _60days = Math.round(ldate.setDate(ldate.getDate() + 60)/1000);
    let _90days = Math.round(ldate.setDate(ldate.getDate() + 90)/1000);
    let _120days = Math.round(ldate.setDate(ldate.getDate() + 120)/1000);
    this.model.due30DaysDate = _30days;
    this.model.due60DaysDate = _60days;
    this.model.due90DaysDate = _90days;
    this.model.due120DaysDate = _120days;
    console.log(this.model);

    this.clientName = this.model.clientName;
    this.invoiceNumber = this.model.invoiceNumber.toString();
    this.invoiceSentDate = new Date(this.model.invoiceSentDate * 1000).toDateString();
    this.netTerms = this.model.netTerms.toString();
    this.numberHours = this.model.numberHours.toString();
    console.log('numberHours=' + this.numberHours);
    this.amount = this.model.amount;

    this.timesheetEndDate = this.model.sTimesheetEndDate;
    this.due30DaysDate = this.getDateString(_invoiceSentTime, 30);
    console.log('due30DaysDate=' + this.due30DaysDate);
    this.due60DaysDate = this.getDateString(_invoiceSentTime, 60);
    console.log('due60DaysDate=' + this.due60DaysDate);
    this.due90DaysDate = this.getDateString(_invoiceSentTime, 90);
    console.log('due90DaysDate=' + this.due90DaysDate);
    this.due120DaysDate = this.getDateString(_invoiceSentTime, 120);
    console.log('due120DaysDate=' + this.due120DaysDate);

    // This is where we interface with the solidity contract to create the new invoice.
    this.invoiceService.addInvoice(
      this.model.clientName,
      this.model.invoiceNumber,
      this.model.netTerms,
      this.model.numberHours,
      this.model.amount,
      this.model.timesheetEndDate,
      this.model.invoiceSentDate,
      this.model.due30DaysDate,
      this.model.due60DaysDate,
      this.model.due90DaysDate,
      this.model.due120DaysDate
    ).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  private getDateString(_startInMilliseconds: number, _numDays: number) {
    const _numSecondsInDay = 86400;
    let rVal: string = new Date(_startInMilliseconds + (_numSecondsInDay * _numDays * 1000)).toDateString();
    return rVal;
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
          'Invoice Number: ' + form.controls['invoiceNumber'].value +
          ', Net Terms: ' + form.controls['netTerms'].value;
        //console.log(rVal);
      }
    }
    return rVal;
  }

  // navigateTimeSheetEndDate(event) {
  //   this.date = event.next;
  // }
}
