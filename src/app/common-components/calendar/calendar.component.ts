import { DatePipe } from '@angular/common';
import { Component, forwardRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true,
    },
  ]
})
export class CalendarComponent implements ControlValueAccessor, OnInit {
  private onChange: any = () => { }
  private onTouched: any = () => { }
  public value: any = '';

  @Input() fieldLabel?: string;
  @Input() fieldId?: string;
  @Input() dateObject: Date;
  @Input() minDateAllowed: Date; 
  @Output() notifyOnDateChange: EventEmitter<any> = new EventEmitter();
  constructor(private datePipe: DatePipe, private utilService: UtilService) { }

  ngOnInit(): void {
  }

  public bsValueChange(event: any) {
    console.log(event);
    // this.value = event;
    this.dateObject = event;
    this.writeValue(event);
    this.onTouched();
  }

  writeValue(value: Date) {
    this.value = this.utilService.transformDate(value);
    this.onChange(this.value);
    this.notifyOnDateChange.emit(value);
    console.log('writeValue', 'old: ' + value, 'new: ' + this.value);
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
    this.onChange(this.value); // for OnInit cycle
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
