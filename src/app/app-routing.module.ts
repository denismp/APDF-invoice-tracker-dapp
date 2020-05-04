import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewClientComponent } from './client/new-client/new-client.component';
import { NewInvoiceComponent } from './invoice/new-invoice/new-invoice.component';
import { InvoiceListComponent } from './reports/invoice-list/invoice-list.component';


const routes: Routes = [
  //{ path: '', redirectTo: 'app-root', pathMatch: 'full'},
  { path: '', redirectTo: 'new-client', pathMatch: 'full'},
  { path: 'new-client', component: NewClientComponent },
  { path: 'new-invoice', component: NewInvoiceComponent },
  { path: 'invoice-list', component: InvoiceListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
