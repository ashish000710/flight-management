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
}