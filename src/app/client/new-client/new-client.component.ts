import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { NgForm } from '@angular/forms';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { ethers } from 'ethers';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  submitted = false;
  //model = new Client('0xdd18cbfab0297cdea52b16f7ed06625dc5ff6b12', 'test');
  model = new Client('', '', '');
  // invoiceTracker: ethers.Contract;

  constructor(private clientService: ClientServiceService) { }

  ngOnInit(): void {
  }

  newClient() {
    this.submitted = false;
    this.model = new Client('', '', '');
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    // TODO: This is where we connect to the solidity contract to create client.
    this.clientService.createClient(form.controls['accountAddress'].value, form.controls['name'].value, form.controls['privatekey'].value).subscribe(
      (model: Client) => {
        this.model = model;
        console.log('MODEL=' + model);
      }, error => {
        console.log("error" + error);
      });
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  // Reveal in html:
  // Name via form.controls = {{showFormControls(clientForm)}}
  showFormControls(form: any) {
    let rVal: string = "";
    if (form !== undefined) {
      if (form.controls['name'] !== undefined) {
        // console.log('Name:' + form.controls['name'].value);
        rVal =
          'Name: ' + form.controls['name'].value +
          ', Account Address: ' + form.controls['accountAddress'].value;
        console.log(rVal);
      }
    }
    return rVal;
  }
}
