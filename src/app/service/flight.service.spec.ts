import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { UtilService } from './util.service';

import { FlightService } from './flight.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MockedClass {

}
describe('FlightService', () => {
  let service: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe, {provide: UtilService, useClass: MockedClass}]
    });
    service = TestBed.inject(FlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
