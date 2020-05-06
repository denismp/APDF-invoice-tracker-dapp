import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewClientComponent } from './client/new-client/new-client.component';
import { NewInvoiceComponent } from './invoice/new-invoice/new-invoice.component';
import { InvoiceListComponent } from './reports/invoice-list/invoice-list.component';
import { FormsModule } from '@angular/forms';
import { DatepickerPopupComponent } from './date/datepicker-popup/datepicker-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    NewClientComponent,
    NewInvoiceComponent,
    InvoiceListComponent,
    DatepickerPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
