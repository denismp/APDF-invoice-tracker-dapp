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
        //this.model = model;
        /**
         * The do something like this:
         * for (let i = 0; i < count; i++) {
              const deliveryHash = await this.deliveryManagerContract.methods.getDeliveryHash(i).call();
              const delivery = await this.deliveryManagerContract.methods.getDelivery(deliveryHash).call();
              const decodedDelivery = this.decodeDelivery(delivery, deliveryHash);
              deliveries.push(decodedDelivery);
            }
         */
        this.isFetching = false;
        if (res !== undefined && res !== "") {
          console.log('SUCCESS: ', res);
          let _invNums: string = res;
          //this.invoiceNumbers = res;
          const clientName: string = this.model.clientName;
          // extract the numbers into an array.
          const nList: string[] = _invNums.split(",");
          for (let i = 0; i < nList.length - 1; i++) {
            console.log('nList[' + i + ']=' + nList[i]);
            let _invNum: number = parseInt(nList[i]);
            this.invoiceService.getInvoice(clientName, _invNum)
              .then(invoice => {
                //console.log(JSON.stringify(invRes));
                console.log('Invoice[' + i + ']datePmtReceived=' + invoice.datePmtReceived);
                console.log('Invoice[' + i + ']due120DaysDate=' + invoice.due120DaysDate);
                console.log('Invoice[' + i + ']due30DaysDate=' + invoice.due30DaysDate);
                console.log('Invoice[' + i + ']due60DaysDate=' + invoice.due60DaysDate);
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

  // navigateTimeSheetEndDate(event) {
  //   this.date = event.next;
  // }
}
