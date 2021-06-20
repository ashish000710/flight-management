import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { CalendarComponent } from './common-components/calendar/calendar.component';
import { DropdownComponent } from './common-components/dropdown/dropdown.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlightSortComponent } from './flight-sort/flight-sort.component';
import { FlightFilterComponent } from './flight-filter/flight-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    SearchFlightComponent,
    CalendarComponent,
    DropdownComponent,
    FlightListComponent,
    FlightSortComponent,
    FlightFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
