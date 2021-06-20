import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownModel, FlightDetailModel, FlightSearchModel, SimpleDropdownItem, TravellerModel } from '../model/flight-detail-model';
import { commonValidator } from './../validation/validator';
import { FlightService } from '../service/flight.service';
import { UtilService } from './../service/util.service';

@Component({
  selector: 'search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  @Output() onFetchSearchParam: EventEmitter<any> = new EventEmitter<any>();
  flightSearchForm: FormGroup;
  departureDateObject: Date = new Date();
  returnDateObject: Date;
  flightSearchParamObj: FlightSearchModel = new FlightSearchModel();
  departureDropDownObject: DropdownModel<SimpleDropdownItem> = new DropdownModel<SimpleDropdownItem>();
  selectedDepartureObj: SimpleDropdownItem;
  destinationDropDownObject: DropdownModel<SimpleDropdownItem> = new DropdownModel<SimpleDropdownItem>();
  selectedDestinationObj: SimpleDropdownItem;
  travellersDropDownObject: DropdownModel<SimpleDropdownItem> = new DropdownModel<SimpleDropdownItem>();
  selectedTravellerObj: SimpleDropdownItem;
  classDropDownObject: DropdownModel<SimpleDropdownItem> = new DropdownModel<SimpleDropdownItem>();
  selectedClassObj: SimpleDropdownItem;
  currentDate: Date = new Date();

  constructor(private fb: FormBuilder,
    private flightService: FlightService,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.initializeSearchParams();
    this.flightSearchForm = this.fb.group({
      departure: [this.selectedDepartureObj],
      destination: [this.selectedDestinationObj],
      departureDate: [this.departureDateObject],
      returnDate: [this.returnDateObject],
      travellers: [this.selectedTravellerObj],
      class: [this.selectedClassObj]
    }, {validator: commonValidator});
  }

  initializeSearchParams(): void {
    const depatureNamelist: DropdownModel<SimpleDropdownItem> = new DropdownModel<SimpleDropdownItem>();
    depatureNamelist.list = this.flightService.getDepartureNameList();
    depatureNamelist.count = depatureNamelist.list.length;
    this.departureDropDownObject = depatureNamelist;
    this.selectedDepartureObj = this.departureDropDownObject.list[0];
    this.destinationDropDownObject = depatureNamelist;
    this.selectedDestinationObj = this.departureDropDownObject.list[1];  //Change this to select other city by default
    this.travellersDropDownObject.list = this.flightService.getTravellerList();
    this.travellersDropDownObject.count = this.travellersDropDownObject.list.length;
    this.selectedTravellerObj = this.travellersDropDownObject.list[0];
    this.classDropDownObject.list = this.flightService.getClassList();
    this.classDropDownObject.count = this.classDropDownObject.list.length;
    this.selectedClassObj = this.classDropDownObject.list[0];
  }

  get departureDate() {
    return this.flightSearchForm.get('departureDate');
  }

  get form() {
    return this.flightSearchForm.controls;
  }

  updateDepatureDate(event: any) {
    this.departureDateObject = event;
  }

  updateReturnDate(event: any) {
    this.returnDateObject = event;
  }

  onSubmit() {
    if(!this.flightSearchForm.valid) {
      return;
    }
    this.utilService.setValue(true);
    Object.keys(this.flightSearchForm.controls).forEach(control=> {
      this.flightSearchParamObj[control] = this.flightSearchForm.controls[control].value;
    })
    this.flightSearchParamObj.travellers = this.flightSearchParamObj.travellers;
    this.onFetchSearchParam.emit(this.flightSearchParamObj);
  }
  updateDepartureCity(event: SimpleDropdownItem) {
    this.selectedDepartureObj = event;
  }
  updateDestinationCity(event: SimpleDropdownItem) {
    this.selectedDestinationObj = event;
  }

  updateTravellerCount(event: SimpleDropdownItem) {
    this.selectedTravellerObj = event;
  }

  updateClass(event: SimpleDropdownItem) {
    this.selectedClassObj = event;
  }
}
