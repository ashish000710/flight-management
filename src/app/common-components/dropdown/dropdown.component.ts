import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownModel, SimpleDropdownItem } from 'src/app/model/flight-detail-model';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true,
 }]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() dropdownData: DropdownModel<SimpleDropdownItem>;
  @Input() selectedData: SimpleDropdownItem;
  @Input() label: string;
  @Input() showValue: boolean;
  @Output() onDataSelect: EventEmitter<any> = new EventEmitter<any>(); 
  departureDropDownArray: DropdownModel<SimpleDropdownItem> = new DropdownModel<SimpleDropdownItem>();
  selectedDepartureObj: SimpleDropdownItem;
  onChange: (_: any) => {};

  constructor() { }

  ngOnInit(): void {
  }

  emitSelectedValue(item: SimpleDropdownItem) {
    this.selectedData = item;
    this.onDataSelect.emit(item);
    this.onChange(item);
  }

  writeValue(value: SimpleDropdownItem) {
    this.selectedData = value;
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  registerOnTouched() { }

}
