import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  HostListener
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { range } from 'lodash';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'ngk-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  /**
   * @memberof DatePickerComponent
   */
  @Input() value: string;

  /**
   * @memberof DatePickerComponent
   */
  @Input() _result: string;

  /**
   * @memberof DatePickerComponent
   */
  @Input() date: any;

  /**
   * @memberof DatePickerComponent
   */
  @Output() update: EventEmitter<string> = new EventEmitter<string>();

  /**
   * @memberof DatePickerComponent
   */
  public year: number;

  /**
   * @memberof DatePickerComponent
   */
  public month: number;

  /**
   * @memberof DatePickerComponent
   */
  public days: number[];

  /**
   * @memberof DatePickerComponent
   */
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  /**
   * @memberof DatePickerComponent
   */
  public currDay: number;

  /**
   * @memberof DatePickerComponent
   */
  public showCalendar = false;

  /**
   * @memberof DatePickerComponent
   */
  // private date = moment().format('YYYY-MM-DD');

  /**
   * @memberof DatePickerComponent
   */
  get result() {
    return this._result;
  }

  /**
   * @memberof DatePickerComponent
   */
  set result(value) {
    this._result = value;
    this.propagateChange(this._result);
  }

  /**
   * @memberof DatePickerComponent
   */
  propagateChange: (_: any) => void = () => {};

  /**
   * @memberof DatePickerComponent
   */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  /**
   * @memberof DatePickerComponent
   */
  registerOnTouched(fn) {}

  /**
   * @memberof DatePickerComponent
   */
  writeValue(value) {
    this.result = value;
  }

  /**
   * @memberof DatePickerComponent
   */
  onChange(value) {
    this.propagateChange(value);
  }

  /**
   * @memberof DatePickerComponent
   */
  @HostListener('document:click')
  onCloseCalendar() {
    if (this.showCalendar) {
      this.showCalendar = false;
      this.update.emit(this.result);
    }
  }

  /**
   * @memberof DatePickerComponent
   */
  ngOnInit() {
    // if (this.date) {
    //   this.date = moment(this.value).format('YYYY-MM-DD');
    // }

    this.year = moment(this.date).year();
    this.month = moment(this.date).month();
    this.currDay = moment(this.date).date();

    this.selectDay(moment(this.date).date());

    this.updateMonth();
  }

  /**
   * @memberof DatePickerComponent
   */
  public updateMonth(event?: Event, type?: string) {
    if (event) {
      event.stopPropagation();
    }

    // increment or decrement month
    this.changeMonthByType(type);

    // decrease or increase month and year by month index
    this.checkMonthIndex();

    // get first day of current month
    const changedDate = moment([this.year, this.month, 1]);

    // get the number of days in current month
    const days = changedDate.daysInMonth();

    // get the starting day of the month
    const day = changedDate.day();

    // generate the blank days of week in calendar
    const prefix = new Array(day % 7);

    // generate each day of month from 1 to 30(31)
    this.days = prefix.concat(range(1, days + 1));
  }

  /**
   * @memberof DatePickerComponent
   */
  public selectDay(day: number) {
    if (!day) {
      return;
    }

    this.currDay = day;

    this.update.emit(this.result);
    this.result = moment([this.year, this.month, day]).format('YYYY-MM-DD');
  }

  /**
   * @memberof DatePickerComponent
   */
  public onShowCalendar(event: Event) {
    event.stopPropagation();

    this.showCalendar = true;
  }

  /**
   * @memberof DatePickerComponent
   */
  private changeMonthByType(type) {
    switch (type) {
      case 'dec':
        this.month--;
        this.currDay = null;
        break;

      case 'inc':
        this.month++;
        this.currDay = null;
    }
  }

  /**
   * @memberof DatePickerComponent
   */
  private checkMonthIndex() {
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    } else if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
  }
}
