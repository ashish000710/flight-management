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
  // sortingOption: Array<SortingModel> = [{
  //   'id': 'price_increasing',
  //   'name': 'Price (Lowest to Highest)'
  // }, {
  //   'id': 'price_decreasing',
  //   'name': 'Price (Highest to Lowest)'
  // }, {
  //   'id': 'duration_shortest',
  //   'name': 'Duration (Shortest to Longest)'
  // }, {
  //   'id': 'duration_longest',
  //   'name': 'Duration (Longest to Shortest)'
  // }, {
  //   'id': 'departure_time',
  //   'name': 'Departure (Earliest to Latest)'
  // }, {
  //   'id': 'arrival_time',
  //   'name': 'Arrival (Earliest to Latest)'
  // }, {
  //   'id': 'name_increasing',
  //   'name': 'Airline (A to Z)'
  // }, {
  //   'id': 'name_decreasing',
  //   'name': 'Airline (Z to A)'
  // }];
  // selectedSorting:SortingModel = new SortingModel();
  flightFilterObject: FlightFilterModel = new FlightFilterModel();
  flightListBackup: Array<FlightDetailModel> = [];
  value: number = 0;
  highValue: number = 50000;
  options: Options = {
    floor: 0,
    ceil: 50000
  };
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

  // // Move it in sort component
  // sortBySelectedValue(sortObj: SortingModel) {
  //   this.selectedSorting = sortObj;
  //   switch(this.selectedSorting.id) {
  //     case 'name_increasing':
  //       this.sortByName('name', 'ASC');
  //       break;
  //     case 'name_decreasing':
  //       this.sortByName('name', 'DESC');
  //       break;
  //     case 'price_increasing':
  //       this.sortByPrice('ASC');
  //       break;
  //     case 'price_decreasing':
  //       this.sortByPrice('DESC');
  //       break;
  //     case 'duration_shortest':
  //       this.sortByDuration('DESC');
  //       break;
  //     case 'duration_longest':
  //       this.sortByDuration('ASC');
  //       break;
  //     case 'departure_time':
  //       this.sortByDepartureTime('ASC');
  //       break;
  //     case 'arrival_time':
  //       this.sortByArrivalTime('ASC');
  //       break;
  //   }
  // };

  bookingFilterArray: Array<PricingModel> = [
    {
      classId: 'economy',
      className: 'Economy',
      amount: 3500,
      currency: 'Rs',
      seatAvailable: 20
    }, 
    {
      classId: 'premium',
      className: 'Premium',
      amount: 15000,
      currency: 'Rs',
      seatAvailable: 20
    }
  ];

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

  // sortByName(sortProperty: string, order: string): void {
  //   this.flightList.sort((a: FlightDetailModel, b: FlightDetailModel) => {
  //     if(order === 'ASC') {
  //       return a.name.localeCompare(b.name);  
  //     }
  //     return b.name.localeCompare(a.name);
  //   })

  // }
  // sortByName(sortProperty: string, order: string, sortingValueType: string): void {
  //   const vm:{[key: string]: any} = this;
  //   const signForStringValueSort = order === 'ASC' ? '>' : '<';
  //   vm.flightList.sort((a:{[key: string]: any}, b: {[key: string]: any})=> {
  //     if(sortingValueType === "string" || sortingValueType === "boolean") {
  //       return `${a[sortProperty]} ${signForStringValueSort} ${b[sortProperty]}`
  //     }
  //     if(order === 'ASC') {
  //       return `${a[sortProperty]} - ${b[sortProperty]}`;
  //     }
  //     return `${b[sortProperty]} - ${a[sortProperty]}`;
  //   })

  // }

  // sortByPrice(order: string): void {
  //   const sign = order === 'ASC' ? '>' : '<';
  //   this.flightList.sort((a, b): number  => {
  //     if(order === 'ASC') {
  //       return a.priceMap.economy.amount - b.priceMap.economy.amount;
  //     } else {
  //       return b.priceMap.economy.amount - a.priceMap.economy.amount;
  //     }
  //   })
  // }

  // sortByDuration(order: string): void {
  //   const sign = order === 'ASC' ? '>' : '<';
  //   this.flightList.sort((a, b): number  => {
  //     if(order === 'ASC') {
  //       return a.journeyTime - b.journeyTime;
  //     } else {
  //       return b.journeyTime - a.journeyTime;
  //     }
  //   })
  // }

  // sortByDepartureTime(order: string): void {
  //   this.flightList.sort((a, b): number  => {
  //       return a.departureTime - b.departureTime;
  //   })
  // }

  // sortByArrivalTime(order: string): void {
  //   this.flightList.sort((a, b): number  => {
  //       return a.arrivalTime - b.arrivalTime;
  //   })
  // }

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
      console.log(this.flightList);
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
  }

  updateBookingClassFilter(event: any, elem: PricingModel) {
    console.log(event);
    console.log(elem);
    if(this.flightFilterObject && this.flightFilterObject.bookingClass) {
      if(event.target.checked) {
        this.flightFilterObject.bookingClass.push(elem.classId);
      } else {
        const indexToSplice = this.flightFilterObject.bookingClass.findIndex(el=> el === elem.classId);
        this.flightFilterObject.bookingClass = this.flightFilterObject.bookingClass.splice(indexToSplice, 0);
      }
    }
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

  showSortPage(event: boolean) {
    this.showSortSectionOnMobile = event;
  }

}
