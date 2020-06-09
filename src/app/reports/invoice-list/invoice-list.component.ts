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
  public privateKey: string;
  //date: { year: number, month: number, day: number };
  public submitted = false;
  public model = new Invoice();
  public sdatePmt: string;
  public invoiceNumbers: string;

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
    // TODO: Here we need to call the solidity contract to get the list of invoice numbers and then retrieve the invoices one at a time.
    this.invoiceService.getInvoiceNumbers(
      form.controls['privatekey'].value,
      this.model.clientName
    ).subscribe(
      //this.model = model;
      (res: string) => {
        console.log('SUCCESS: ', res);
        //this.invoiceNumbers = res;
        const privateKey: string = form.controls['privatekey'].value;
        const clientName: string = this.model.clientName;
        //console.log('SUCCESS: ', res);
        this.invoiceNumbers = res;
        // extract the numbers into an array.
        const nList: string[] = res.split(",");
        for (let i = 0; i < nList.length-1; i++) {
          console.log('nList[' + i + ']=' + nList[i]);
          let _invNum: number = parseInt(nList[i]);
          const invoice = this.invoiceService.getInvoice(privateKey, clientName, _invNum).subscribe((invRes: Invoice) => {
            //console.log(JSON.stringify(invRes));
            console.log('Invoice['+i+']clientName='+invRes.clientName);
            console.log('Invoice['+i+']datePmtReceived='+invRes.datePmtReceived);
            console.log('Invoice['+i+']due120DaysDate='+invRes.due120DaysDate);
            console.log('Invoice['+i+']due30DaysDate='+invRes.due30DaysDate);
            console.log('Invoice['+i+']due60DaysDate='+invRes.due60DaysDate);
          });
        }
        /**
         * The do something like this:
         * for (let i = 0; i < count; i++) {
              const deliveryHash = await this.deliveryManagerContract.methods.getDeliveryHash(i).call();
              const delivery = await this.deliveryManagerContract.methods.getDelivery(deliveryHash).call();
              const decodedDelivery = this.decodeDelivery(delivery, deliveryHash);
              deliveries.push(decodedDelivery);
            }
         */

      },
      error => console.log("error" + error),
      () => console.log('Request completed')
    );
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
        console.log(rVal);
      }
    }
    return rVal;
  }


  // navigateTimeSheetEndDate(event) {
  //   this.date = event.next;
  // }
}
