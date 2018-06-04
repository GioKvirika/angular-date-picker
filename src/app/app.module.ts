import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DatePickerModule } from './modules/date-picker/date-picker.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DatePickerModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
