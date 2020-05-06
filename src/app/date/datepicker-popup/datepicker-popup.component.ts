import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker-popup',
  templateUrl: './datepicker-popup.component.html',
  styleUrls: ['./datepicker-popup.component.css']
})
export class DatepickerPopupComponent implements OnInit {
  model: NgbDateStruct;
  constructor(private calendar: NgbCalendar) { }

  ngOnInit(): void {
  }

  getNgbDate(): NgbDateStruct {
    return this.model;
  }

}
