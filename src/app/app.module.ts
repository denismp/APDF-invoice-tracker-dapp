import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewClientComponent } from './client/new-client/new-client.component';
import { NewInvoiceComponent } from './invoice/new-invoice/new-invoice.component';
import { InvoiceListComponent } from './reports/invoice-list/invoice-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NewClientComponent,
    NewInvoiceComponent,
    InvoiceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
