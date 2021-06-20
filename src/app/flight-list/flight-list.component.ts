import { Options } from '@angular-slider/ngx-slider';
import { Component, Input, OnInit } from '@angular/core';
import { faArrowRight, faFrown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FlightDetailModel, FlightSearchModel, SortingModel, FlightFilterModel, PricingModel } from '../model/flight-detail-model';
import { UtilService } from '../service/util.service';


@Component({
  selector: 'flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  @Input() flightList: Array<FlightDetailModel>;
  @Input() searchParam: FlightSearchModel;
  isMobileDevice: boolean;
  showSortSectionOnMobile: boolean = false;
  showFilterSectionOnMobile: boolean = false;
  travelDate: Date;
  flightFilterObject: FlightFilterModel = new FlightFilterModel();
  flightListBackup: Array<FlightDetailModel> = [];
  faArrowRight = faArrowRight;
  faFrown = faFrown;
  faArrowLeft = faArrowLeft;

  constructor(private utilService: UtilService) { 
    this.isMobileDevice = this.utilService.checkIsMobileDevice();
  }

  ngOnInit(): void {
    this.travelDate = new Date(this.searchParam.departureDate);
    this.flightList = this.setFlightMetadata(this.flightList);
    this.flightListBackup = this.flightList;
  }

  setFlightMetadata(flightList: Array<FlightDetailModel>): Array<FlightDetailModel> {
    flightList.map((flight: FlightDetailModel) => {
      flight.departureDateString = this.convertTimestampToExpectedFormat(flight.departureTime, 'time');
      flight.returnDateString = flight.returnDate ? this.convertTimestampToExpectedFormat(flight.returnDate, 'time'): undefined;
      flight.journeyTimeString = this.getJourneyTimeString(flight.journeyTime);
      flight.arrivalTime = new Date((flight.departureTime + flight.journeyTime)).getTime();
      flight.arrivalDateString = this.convertTimestampToExpectedFormat(flight.arrivalTime, 'time');
    });
    return flightList;
  }

  convertTimestampToExpectedFormat(timestamp: number, format: string): string {
    let timeString: string = '';
    if(format === 'time') {
      timeString = `${new Date(timestamp).getHours()}:${new Date(timestamp).getMinutes()}`.toString();
    } else if(format === 'date') {
      timeString = `${new Date().getMonth() + 1}/${new Date(timestamp).getDate()}/${new Date(timestamp).getFullYear()}`.toString();
    } else if(format === 'date-time') {
      timeString = `${new Date().getMonth() + 1}/${new Date(timestamp).getDate()}/${new Date(timestamp).getFullYear()} ${new Date(timestamp).getHours()}:${new Date(timestamp).getMinutes()}`.toString();
    }
    return timeString;

  }

  getJourneyTimeString(journeyDuration: number): string {
    const mins: number = parseInt((journeyDuration/(1000*60)).toString());
    const hours: number = parseInt((mins/60).toString());
    const days: number = parseInt((hours/24).toString());
    const remainingMinutes = mins%60;
    const remainingHours = hours%60;
    let timeString = ''     
    if(mins < 1) {
        timeString = '0 m';
    } else if(mins >= 1 && mins < 60){
        timeString = `${mins} m`;
    } else if(hours >=1 && hours < 24){
        timeString = `${hours} h ${remainingMinutes} m`;
    } else {
        timeString = `${days}d ${remainingHours} h ${remainingMinutes} m`;
    }
    return timeString;
  }

  showSortFlightSectionOnMobile() {
    this.showSortSectionOnMobile = true;
  }

  showFilterFlightSectionOnMobile() {
    this.showFilterSectionOnMobile = true;
  }

  sortFlightBySelectedParam(event: any): void {
    this.sortFlightBySelectedParam = event.val;
    this.flightList =  event.list;
  }

  filterFlight(event: Array<FlightDetailModel>): void {
    this.flightList =  event;
  }

  gotToSearchPage() {
    this.utilService.setValue(false);
  }

  redirectSortToFlightList(event: boolean) {
    this.showSortSectionOnMobile = event;
  }

  redirectFilterToFlightList(event: boolean) {
    this.showFilterSectionOnMobile = event;
  }

}
