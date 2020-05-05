import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { from } from 'rxjs';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];
  submitted = false;
  //model = new Client('0xdd18cbfab0297cdea52b16f7ed06625dc5ff6b12', 'test');
  model = new Client('', '');

  constructor() { }

  ngOnInit(): void {
  }

  newClient() {
    this.submitted = false;
    this.model = new Client('', '');
  }

  onSubmit() {
    this.submitted = true;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }


  // Reveal in html:
  //   Name via form.controls = {{showFormControls(clientForm)}}
  showFormControls(form: any) {
    let rVal: string = "";
    if (form !== undefined) {
      if (form.controls['name'] !== undefined) {
        console.log('Name:' + form.controls['name'].value);
        rVal =
          'Name: ' + form.controls['name'].value +
          ', Account Address: ' + form.controls['accountAddress'].value;
      }
      if (form.controls['accountAddress'] !== undefined) {
        console.log('Address' + form.controls['accountAddress'].value);
      }
    }
    return rVal;
  }
}
