import { Component, OnInit, ViewChild } from '@angular/core';
import { Invoice } from './invoice';
import { NgbDatepicker, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

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
  submitted = false;
  model = new Invoice();
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


  constructor(public formatter: NgbDateParserFormatter) { }

  ngOnInit(): void {
  }

  newInvoice() {
    this.submitted = false;
    this.model = new Invoice();
  }

  onSubmit(form: NgForm) {
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
    this.model.timesheetEndDate= Math.round(_date.getTime() / 1000); // convert milliseconds to seconds for solidity time stamp.
    this.model.sTimesheetEndDate= _date.toDateString();
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
    let _invoiceSentTime = _date.getTime();
    let _30days = this.convertMillisecondsToSeconds(_invoiceSentTime, 30);
    let _60days = this.convertMillisecondsToSeconds(_invoiceSentTime, 60);
    let _90days = this.convertMillisecondsToSeconds(_invoiceSentTime, 90);
    let _120days = this.convertMillisecondsToSeconds(_invoiceSentTime, 120);
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
    console.log('due30DaysDate='+this.due30DaysDate);
    this.due60DaysDate = this.getDateString(_invoiceSentTime, 60);
    console.log('due60DaysDate='+this.due60DaysDate);
    this.due90DaysDate = this.getDateString(_invoiceSentTime, 90);
    console.log('due90DaysDate='+this.due90DaysDate);
    this.due120DaysDate = this.getDateString(_invoiceSentTime, 120);
    console.log('due120DaysDate='+this.due120DaysDate);
    // TODO: This is where we interface with the solidity contract to create the new invoice.
  }

  private convertMillisecondsToSeconds(_milliseconds: number, _numDays: number) {
    const _numSecondsInDay = 86400;
    let _daysInSeconds = new Date(_milliseconds + (_numSecondsInDay * _numDays)).getTime() / 1000;
    _daysInSeconds = Math.round(_daysInSeconds);
    //console.log('_daysInSeconds=' + _daysInSeconds);
    return _daysInSeconds;
  }

  private getDateString(_startInMilliseconds: number,_numDays: number) {
    const _numSecondsInDay = 86400;
    let rVal: string = new Date(_startInMilliseconds + (_numSecondsInDay * _numDays * 1000)).toDateString();
    return rVal;
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
          'Invoice Number: ' + form.controls['invoiceNumber'].value +
          ', Net Terms: ' + form.controls['netTerms'].value;
        console.log(rVal);
      }
    }
    return rVal;
  }

  // navigateTimeSheetEndDate(event) {
  //   this.date = event.next;
  // }

}
