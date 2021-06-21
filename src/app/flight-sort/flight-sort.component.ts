import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { FlightDetailModel, SortingModel } from '../model/flight-detail-model';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'flight-sort',
  templateUrl: './flight-sort.component.html',
  styleUrls: ['./flight-sort.component.scss']
})
export class FlightSortComponent implements OnInit {
  @Input() flightList: Array<FlightDetailModel>;
  @Output() notifyOnSortSelection: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyOnBackButton: EventEmitter<any> = new EventEmitter<any>();
  sortingOption: Array<SortingModel> = [{
    'id': 'price_increasing',
    'name': this.translate.instant('sort.price.increasing')
  }, {
    'id': 'price_decreasing',
    'name': this.translate.instant('sort.price.decreasing')
  }, {
    'id': 'duration_shortest',
    'name': this.translate.instant('sort.duration.increasing')
  }, {
    'id': 'duration_longest',
    'name': this.translate.instant('sort.duration.decreasing')
  }, {
    'id': 'departure_time',
    'name': this.translate.instant('sort.departure.time.increasing')
  }, {
    'id': 'arrival_time',
    'name': this.translate.instant('sort.arrival.time.increasing')
  }, {
    'id': 'name_increasing',
    'name': this.translate.instant('sort.name.increasing')
  }, {
    'id': 'name_decreasing',
    'name': this.translate.instant('sort.name.decreasing')
  }];
  selectedSorting:SortingModel = new SortingModel();
  isMobileDevice: boolean;
  faArrowLeft = faArrowLeft;

  constructor(private utilService: UtilService,
    private translate: TranslateService) {
    this.isMobileDevice = this.utilService.checkIsMobileDevice();
  }

  ngOnInit(): void {
  }

  sortBySelectedValue(event: any, sortObj: SortingModel) {
    this.selectedSorting = sortObj;
  }

  selectSort() {
    const obj = {'list': this.flightList, 'val': false};
    switch(this.selectedSorting.id) {
      case 'name_increasing':
        this.sortByName('name', 'ASC');
        break;
      case 'name_decreasing':
        this.sortByName('name', 'DESC');
        break;
      case 'price_increasing':
        this.sortByPrice('ASC');
        break;
      case 'price_decreasing':
        this.sortByPrice('DESC');
        break;
      case 'duration_shortest':
        this.sortByDuration('DESC');
        break;
      case 'duration_longest':
        this.sortByDuration('ASC');
        break;
      case 'departure_time':
        this.sortByDepartureTime('ASC');
        break;
      case 'arrival_time':
        this.sortByArrivalTime('ASC');
        break;
    }
    this.notifyOnSortSelection.emit(obj);
    this.gotToFlightSection();
  }

  sortByName(sortProperty: string, order: string): void {
    this.flightList.sort((a: FlightDetailModel, b: FlightDetailModel) => {
      if(order === 'ASC') {
        return a.name.localeCompare(b.name);  
      }
      return b.name.localeCompare(a.name);
    })

  }
  //            --To Do - Generic method for sort
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

  sortByPrice(order: string): void {
    this.flightList.sort((a, b): number  => {
      if(order === 'ASC') {
        return a.priceMap.economy.amount - b.priceMap.economy.amount;
      } else {
        return b.priceMap.economy.amount - a.priceMap.economy.amount;
      }
    })
  }

  sortByDuration(order: string): void {
    this.flightList.sort((a, b): number  => {
      if(order === 'ASC') {
        return a.journeyTime - b.journeyTime;
      } else {
        return b.journeyTime - a.journeyTime;
      }
    })
  }

  sortByDepartureTime(order: string): void {
    this.flightList.sort((a, b): number  => {
        return a.departureTime - b.departureTime;
    })
  }

  sortByArrivalTime(order: string): void {
    this.flightList.sort((a, b): number  => {
        return a.arrivalTime - b.arrivalTime;
    })
  }

  gotToFlightSection() {
    this.notifyOnBackButton.emit(false);
  }

}
