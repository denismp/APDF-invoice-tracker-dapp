import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { NgForm } from '@angular/forms';
import { ClientServiceService } from 'src/app/services/client-service.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  public submitted: boolean = false;
  //model = new Client('0xdd18cbfab0297cdea52b16f7ed06625dc5ff6b12', 'test');
  public model: Client = new Client();
  // invoiceTracker: ethers.Contract;

  constructor(private clientService: ClientServiceService) { }

  public ngOnInit(): void { }

  public newClient() {
    this.submitted = false;
    this.model = new Client();
  }

  /**
   * @description - called from the html template.  never use async on methods called from the template.
   * @param {NgForm} form
   */
  public onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    this.clientService.createClient(form.controls['accountAddress'].value, form.controls['name'].value)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }

  // TODO: Remove this when we're done
  public get diagnostic() { return JSON.stringify(this.model); }

  // Reveal in html:
  // Name via form.controls = {{showFormControls(clientForm)}}
  public showFormControls(form: any) {
    let rVal: string = "";
    if (form !== undefined) {
      if (form.controls['name'] !== undefined) {
        // console.log('Name:' + form.controls['name'].value);
        rVal =
          'Name: ' + form.controls['name'].value +
          ', Account Address: ' + form.controls['accountAddress'].value;
        //console.log(rVal);
      }
    }
    return rVal;
  }
}
