import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FlightService } from '../service/flight.service';
import { UtilService } from './../service/util.service';
import { FlightDetailModel, FlightSearchModel, ITab } from './../model/flight-detail-model';
import { Subscriber, Subscription } from 'rxjs';
@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit {
  flightList: Array<FlightDetailModel> = [];
  showFlights: boolean = false;
  searchParams:FlightSearchModel;
  isFormSubmit: boolean = false;
  subscription: Subscription;
  isMobileDevice: boolean = false;

  constructor(private flightService: FlightService,
    private utilService: UtilService) {
      this.isMobileDevice = this.utilService.checkIsMobileDevice();
      this.subscription = this.utilService.subject.subscribe(result => { 
        this.isFormSubmit = result.val;
      });
  }

  ngOnInit(): void {
  }

  fetchFlightList(event: FlightSearchModel) {
    this.searchParams = event;
    const flightList = this.flightService.searchFlightsFromList(event);
    this.flightList = flightList;
    this.showFlights = true;
  }

  // applyFilter(): void {

  //   this.flightFilterObject.minPrice = this.value;
  //   this.flightFilterObject.maxPrice = this.highValue;
  //   if(this.flightFilterObject.bookingClass.length > 0) {
  //     this.flightFilterObject.bookingClass.forEach(bookingClass=> {
  //       this.flightList = this.flightListBackup.filter(elem=> {
  //         return elem.priceMap[bookingClass].seatAvailable > 0;
  //       });
  //     });
  //     console.log(this.flightList);
  //     if(this.flightFilterObject.minPrice >= 0 && this.flightFilterObject.maxPrice >= 0) {
  //       let flightListArr = this.flightList.filter((elem: FlightDetailModel)=> {
  //         return elem.priceMap.economy.amount >= this.flightFilterObject.minPrice;
  //       }).filter((elem: FlightDetailModel)=> {
  //         return elem.priceMap.economy.amount <= this.flightFilterObject.maxPrice;
  //       });
  //       this.flightList = flightListArr;
  //     }
  //   } else {
  //     if(this.flightFilterObject.minPrice >= 0 && this.flightFilterObject.maxPrice >= 0) {
  //       let flightListArr = this.flightListBackup.filter((elem: FlightDetailModel)=> {
  //         return elem.priceMap.economy.amount >= this.flightFilterObject.minPrice;
  //       }).filter((elem: FlightDetailModel)=> {
  //         return elem.priceMap.economy.amount <= this.flightFilterObject.maxPrice;
  //       });
  //       this.flightList = flightListArr;
  //     }
  //   }
  // }
  sortFlightBySelectedParam(event: any) {
    console.log(event);
  }
}