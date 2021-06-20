import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { UtilService } from '../service/util.service';

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
      {provide: UtilService, useClass: Mockedclass}]
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
});
