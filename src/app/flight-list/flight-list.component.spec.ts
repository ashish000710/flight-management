import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { UtilService } from '../service/util.service';
import { FlightService } from './../service/flight.service';

import { FlightListComponent } from './flight-list.component';
import { Injectable } from '@angular/core';
@Injectable()
export class Mockedclass {
  checkIsMobileDevice() {return}
}
describe('FlightListComponent', () => {
  let component: FlightListComponent;
  let fixture: ComponentFixture<FlightListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightListComponent ],
      providers: [DatePipe,
        {provide: UtilService, useClass: Mockedclass},
        FlightService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test setFlightMetadata method and expect departureDateString to be defined', ()=> {
    console.log("test setFlightMetadata method and expect departureDateString to be defined");
    // Given
    spyOn(component, 'convertTimestampToExpectedFormat').and.returnValue('8h 0m');
    const departureDateString = '8h 0m';
    const flightList = [{
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
      departureTime: new Date().getTime(),
      departureDateString: '',
      journeyTime: 28800000,
      journeyTimeString: '',
      arrivalTime: new Date(new Date().getTime() + 28800000).getTime(),
      arrivalDateString: '',
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
    }];
    // When
    component.setFlightMetadata(flightList);
    
    // Then
    expect(flightList[0].departureDateString).toEqual(departureDateString);
  })
});
