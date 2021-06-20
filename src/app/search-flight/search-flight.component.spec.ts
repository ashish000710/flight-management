import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { UtilService } from './../service/util.service';

import { SearchFlightComponent } from './search-flight.component';
@Injectable()
export class MockedClass {

}
describe('SearchFlightComponent', () => {
  let component: SearchFlightComponent;
  let fixture: ComponentFixture<SearchFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFlightComponent ],
      providers: [FormBuilder,
      {provide: UtilService, useClass: MockedClass}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
