import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';

import { FlightFilterComponent } from './flight-filter.component';
import { By } from '@angular/platform-browser';

describe('FlightFilterComponent', () => {
  let component: FlightFilterComponent;
  let fixture: ComponentFixture<FlightFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightFilterComponent ],
      providers: [DatePipe]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test resetFilter method and expect filterobjects to be empty', ()=>{
    console.log("test resetFilter method and expect filterobjects to be empty");
    // Given
    const flightObj = {
      minPrice: -1,
      maxPrice: -1,
      bookingClass: []
    }
    // When
    component.resetFilter();
    // Then
    expect(component.flightFilterObject).toEqual(flightObj);
    expect(component.value).toEqual(0);
    expect(component.highValue).toEqual(50000);
    expect(component.flightFilterObject.bookingClass).toEqual([]);
  })
});
