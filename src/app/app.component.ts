import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;

  /**
   * @memberof AppComponent
   */
  start_date = moment('2018-10-10').format('YYYY-MM-DD');

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      start_date: '2018-04-08',
      end_date: moment().format('YYYY-MM-DD')
    });
  }
}
