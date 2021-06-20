import { Injectable } from '@angular/core';
import { FlightDetailModel, FlightSearchModel, SimpleDropdownItem, TravellerModel } from '../model/flight-detail-model';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private utilService: UtilService) { }

  getFlightList():Array<FlightDetailModel> {
    const list = [{
      name: "Alpha Airlines",
      logo: "alpha_airlines",
      id: "A1E2I3",
      departure: {
          'id': '1', 
          'name': 'Delhi', 
          'code': 'DEL'
      },
      destination: {
          'id': '0', 
          'name': 'Mumbai', 
          'code': 'BOM'
      },
      // departureTime: new Date('06/17/2021 00:00:00').getTime(),
      departureTime: new Date().getTime(),
      departureDateString: '',
      journeyTime: 28800000,
      journeyTimeString: '',
      arrivalTime: new Date(new Date().getTime() + 28800000).getTime(),
      arrivalDateString: '',
      // travellers: new TravellerModel(),
      class: [{
          'id': 'economy',
      'name': 'Economy'
      }, {
          'id': 'firstClass',
          'name':  'First Class'
      }],
      availableSeatsCount: 100,
      journeyDuration: '14h 20m',
      HaultNumbers: 2,
      haultDetails: [{
        departure: {
          'id': '2', 
          'name': 'Jaipur', 
          'code': 'JAI'
        },
        arrivalTime: new Date((new Date().getTime() + 7200000)).getTime(),
        departureTime: new Date((new Date().getTime() + 9000000)).getTime()
      }, {
        departure: {
          'id': '50', 
          'name': 'Ahmedabad', 
          'code': 'AMD'
        },
        arrivalTime: new Date((new Date().getTime() + 18000000)).getTime(),
        departureTime: new Date((new Date().getTime() + 19800000)).getTime()
      }],
      priceMap: {
        economy: {
            classId: 'economy',
            className: 'Economy',
            amount: 3500,
            currency: 'Rs',
            seatAvailable: 20
        }, 
        premium: {
            classId: 'premium',
            className: 'Premium',
            amount: 15000,
            currency: 'Rs',
            seatAvailable: 20
      }}
    }, {
      name: "Beta Airlines",
      id: "B1C2D3",
      logo: "beta_airlines",
      departure: {
          'id': '1', 
          'name': 'Delhi', 
          'code': 'DEL'
      },
      destination: {
          'id': '0', 
          'name': 'Mumbai', 
          'code': 'BOM'
      },
      departureTime: new Date().getTime(),
      departureDateString: '',
      journeyTime: 5400000,
      journeyTimeString: '',
      returnDate: new Date().getTime(),
      returnDateString: '',
      arrivalTime: new Date(new Date().getTime() + 5400000).getTime(),
      arrivalDateString: '',
      // travellers: new TravellerModel(),
      class: [{
          'id': 'economy',
          'name': 'Economy'
      }, {
          'id': 'premium',
          'name':  'Premium'
      }],
      availableSeatsCount: 100,
      journeyDuration: '14h 20m',
      HaultNumbers: 1,
      haultDetails: [{
        departure: {
          'id': '2', 
          'name': 'Jaipur', 
          'code': 'JAI'
        },
        arrivalTime: new Date((new Date().getTime() + 1800000)).getTime(),
        departureTime: new Date((new Date().getTime() + 2700000)).getTime()
      }],
      priceMap: {
        economy: {
            classId: 'economy',
            className: 'Economy',
            amount: 5500,
            currency: 'Rs',
            seatAvailable: 20
        }, 
        premium: {
            classId: 'premium',
            className: 'Premium',
            amount: 25000,
            currency: 'Rs',
            seatAvailable: 20
      }}
    }];
    return list;
  }

  searchFlightsFromList(SearchParamObj: FlightSearchModel): Array<FlightDetailModel> {
    let flightList: Array<FlightDetailModel> = this.getFlightList();
    flightList =  flightList.filter((flight:FlightDetailModel)=> flight.departure.code === SearchParamObj.departure.value).
    filter((flight:FlightDetailModel)=>flight.destination.code === SearchParamObj.destination.value).
    filter((flight:FlightDetailModel)=>this.utilService.transformDate(flight.departureTime) === this.utilService.transformDate(SearchParamObj.departureDate)).
    filter((flight:FlightDetailModel)=> flight.availableSeatsCount >= SearchParamObj.travellers.value).
    filter((flight:FlightDetailModel)=> {
      const travellerCount = SearchParamObj.travellers.value;
      const availableSeatForSelectedClass = flight.priceMap[SearchParamObj.class.value].seatAvailable;
      return (availableSeatForSelectedClass > 0 && availableSeatForSelectedClass >= travellerCount);
    })
    // flightList =  flightList.filter((flight:FlightDetailModel)=> flight.departure.code === SearchParamObj.departure.value);
    // flightList =  flightList.filter((flight:FlightDetailModel)=>flight.destination.code === SearchParamObj.destination.value);
    // flightList =  flightList.filter((flight:FlightDetailModel)=>this.utilService.transformDate(flight.departureTime) === this.utilService.transformDate(SearchParamObj.departureDate));
    // flightList =  flightList.filter((flight:FlightDetailModel)=> flight.availableSeatsCount >= SearchParamObj.travellers.value);
    // flightList =  flightList.filter((flight:FlightDetailModel)=> {
    //   const travellerCount = SearchParamObj.travellers.value;
    //   const availableSeatForSelectedClass = flight.priceMap[SearchParamObj.class.value].seatAvailable;
    //   return (availableSeatForSelectedClass > 0 && availableSeatForSelectedClass >= travellerCount);
    // })
    return flightList;
  }

  getDepartureNameList(): Array<SimpleDropdownItem> {
    return [{
      'id': 1,
      'name': 'Delhi', 
      'value': 'DEL'
    }, {
      'id': 0,
      'name': 'Mumbai', 
      'value': 'BOM'
    }, {
      'id': 2, 
      'name': 'Jaipur', 
      'value': 'JAI'
    }, {
    'id': 50,
    'name': 'Ahmedabad', 
    'value': 'AMD'
  }]
  }

  getTravellerList(): Array<SimpleDropdownItem> {
    return [{
      'id': 1,
      'name': '1',
      'value': 1
    }, {
      'id': 2,
      'name': '2',
      'value': 2
    }, {
      'id': 3, 
      'name': '3',
      'value': 3
    }, {
      'id': 4,
      'name': '4',
      'value': 4
    }, {
      'id': 5,
      'name': '5',
      'value': 5
    }, {
      'id': 6,
      'name': '6',
      'value': 6
    }]
  }

  getClassList(): Array<SimpleDropdownItem> {
    return [{
      'id': 1,
      'name': 'Economy', 
      'value': 'economy'
    }, {
      'id': 1,
      'name': 'Premium', 
      'value': 'premium'
    }]
  }
}
