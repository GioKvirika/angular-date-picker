import { NgModule, forwardRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DatePickerComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatePickerComponent)
    }
  ],
  exports: [DatePickerComponent]
})
export class DatePickerModule {}
