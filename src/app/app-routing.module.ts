import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewClientComponent } from './client/new-client/new-client.component';
import { NewInvoiceComponent } from './invoice/new-invoice/new-invoice.component';
import { InvoiceListComponent } from './reports/invoice-list/invoice-list.component';
import { UpdateInvoiceComponent } from './invoice/update-invoice/update-invoice.component';
import { ClientListComponent } from './reports/client-list/client-list.component';


const routes: Routes = [
  //{ path: '', redirectTo: 'app-root', pathMatch: 'full'},
  { path: '', redirectTo: 'new-client', pathMatch: 'full'},
  { path: 'new-client', component: NewClientComponent },
  { path: 'client-list', component: ClientListComponent },
  { path: 'new-invoice', component: NewInvoiceComponent },
  { path: 'update-invoice', component: UpdateInvoiceComponent },
  { path: 'invoice-list', component: InvoiceListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
