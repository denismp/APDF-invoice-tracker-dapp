import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from 'src/app/invoice/new-invoice/invoice';
import { NgForm } from '@angular/forms';
import { InvoiceServiceService } from 'src/app/services/invoice-service.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  //@ViewChild('dp') dp: NgbDatepicker;
  public dateModel: NgbDateStruct;
  //public privateKey: string;
  //date: { year: number, month: number, day: number };
  public submitted = false;
  public model = new Invoice();
  public sdatePmt: string;
  public invoiceNumbers: string;
  public loadedInvoices: Invoice[] = [];
  public isFetching: boolean = false;

  constructor(public formatter: NgbDateParserFormatter, private invoiceService: InvoiceServiceService) { }

  public ngOnInit(): void {
  }

  public newInvoice() {
    this.submitted = false;
    this.model = new Invoice();
    this.loadedInvoices = [];
  }
  //datePmtReceived
  public onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    this.model.clientName = form.controls['clientName'].value;
    console.log(this.model);
    // Here we need to call the solidity contract to get the list of invoice numbers and then retrieve the invoices one at a time.
    this.isFetching = true;
    this.invoiceService.getInvoiceNumbers(this.model.clientName)
      .then(res => {
        this.isFetching = false;
        if (res !== undefined) {
          console.log('SUCCESS: ', res);
          let _invNums: number[] = res;
          //this.invoiceNumbers = res;
          const clientName: string = this.model.clientName;
          // extract the numbers into an array.
          //const nList: string[] = _invNums.split(",");
          for (let i = 0; i < _invNums.length; i++) {
            //console.log('nList[' + i + ']=' + nList[i]);
            let _invNum: number = _invNums[i];
            this.invoiceService.getInvoice(clientName, _invNum)
              .then(invoice => {
                console.log(invoice);
                // console.log('Invoice[' + i + ']datePmtReceived=' + invoice.datePmtReceived);
                // console.log('Invoice[' + i + ']due120DaysDate=' + invoice.due120DaysDate);
                // console.log('Invoice[' + i + ']due30DaysDate=' + invoice.due30DaysDate);
                // console.log('Invoice[' + i + ']due60DaysDate=' + invoice.due60DaysDate);
                this.loadedInvoices.push(invoice);
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          console.log('InvoiceListComponent.onSubmit(): getInvoiceNumbers() returned no data');
        }
      })
      .catch(err => {
        this.isFetching = false;
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
      if (form.controls['clientName'] !== undefined) {
        //console.log('Invoice Number:' + form.controls['invoiceNumber'].value);
        rVal =
          'Client Name: ' + form.controls['clientName'].value;
        //console.log(rVal);
      }
    }
    return rVal;
  }

  public getStdDateString(_numSeconds: string): string {
    //console.log('getStdDateString(): _numSeconds=',_numSeconds);
    if (parseInt(_numSeconds) === 0) {
      return "";
    }
    let rVal: string = new Date(parseInt(_numSeconds) * 1000).toDateString();
    return rVal;
  }

  // navigateTimeSheetEndDate(event) {
  //   this.date = event.next;
  // }
}
