import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Options } from '@angular-slider/ngx-slider';
import { FlightDetailModel, FlightFilterModel, BookingClassDropdownModel } from '../model/flight-detail-model';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.scss']
})
export class FlightFilterComponent implements OnInit {

  constructor(private utilService: UtilService) {
    this.isMobileDevice = this.utilService.checkIsMobileDevice();
  }
  @Input() flightList: Array<FlightDetailModel>;
  @Input() flightListBackup: Array<FlightDetailModel>;
  @Output() notifyOnFilterSelection: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyOnBackButton: EventEmitter<any> = new EventEmitter<any>();
  isMobileDevice: boolean;
  value: number = 0;
  faArrowLeft = faArrowLeft;
  highValue: number = 50000;
  options: Options = {
    floor: 0,
    ceil: 50000
  };
  bookingFilterArray: Array<BookingClassDropdownModel> = [
    {
      classId: 'economy',
      className: 'Economy',
      amount: 3500,
      currency: 'Rs',
      seatAvailable: 20,
      isSelected: false
    }, 
    {
      classId: 'premium',
      className: 'Premium',
      amount: 15000,
      currency: 'Rs',
      seatAvailable: 20,
      isSelected: false
    }
  ];
  selectedFilter: BookingClassDropdownModel;
  flightFilterObject: FlightFilterModel = new FlightFilterModel();

  ngOnInit(): void {
  }

  updateBookingClassFilter(event: any, elem: BookingClassDropdownModel, index: number) {
    if(this.flightFilterObject && this.flightFilterObject.bookingClass) {
      if(event.target.checked) {
        this.bookingFilterArray[index].isSelected = true;
        this.flightFilterObject.bookingClass.push(elem.classId);
      } else {
        this.bookingFilterArray[index].isSelected = false;
        const indexToSplice = this.flightFilterObject.bookingClass.findIndex(el=> el === elem.classId);
        this.flightFilterObject.bookingClass = this.flightFilterObject.bookingClass.splice(indexToSplice, 0);
      }
    }
  }

  resetFilter(): void {
    const flightObj = {
      minPrice: -1,
      maxPrice: -1,
      bookingClass: []
    }
    this.flightFilterObject = flightObj;
    this.value = 0;
    this.highValue = 50000;
    this.flightFilterObject.bookingClass = [];
    this.flightList = this.flightListBackup;
    this.bookingFilterArray.map((bookingClass: BookingClassDropdownModel)=>bookingClass.isSelected = false);
    this.notifyOnFilterSelection.emit(this.flightList);
  }

  applyFilter(): void {
    this.flightFilterObject.minPrice = this.value;
    this.flightFilterObject.maxPrice = this.highValue;
    if(this.flightFilterObject.bookingClass.length > 0) {
      this.flightFilterObject.bookingClass.forEach(bookingClass=> {
        this.flightList = this.flightListBackup.filter(elem=> {
          return elem.priceMap[bookingClass].seatAvailable > 0;
        });
      });
      if(this.flightFilterObject.minPrice >= 0 && this.flightFilterObject.maxPrice >= 0) {
        let flightListArr = this.flightList.filter((elem: FlightDetailModel)=> {
          return elem.priceMap.economy.amount >= this.flightFilterObject.minPrice;
        }).filter((elem: FlightDetailModel)=> {
          return elem.priceMap.economy.amount <= this.flightFilterObject.maxPrice;
        });
        this.flightList = flightListArr;
      }
    } else {
      if(this.flightFilterObject.minPrice >= 0 && this.flightFilterObject.maxPrice >= 0) {
        let flightListArr = this.flightListBackup.filter((elem: FlightDetailModel)=> {
          return elem.priceMap.economy.amount >= this.flightFilterObject.minPrice;
        }).filter((elem: FlightDetailModel)=> {
          return elem.priceMap.economy.amount <= this.flightFilterObject.maxPrice;
        });
        this.flightList = flightListArr;
      }
    }
    this.notifyOnFilterSelection.emit(this.flightList);
    this.gotToFlightSection();
  }

  gotToFlightSection() {
    this.notifyOnBackButton.emit(false);
  }
}
