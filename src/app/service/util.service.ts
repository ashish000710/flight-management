import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(private datePipe: DatePipe) { }
  subject: Subject<any> = new Subject<any>();

  setValue(value: boolean) {
    this.subject.next({val: value});
  }
  
  checkIsMobileDevice(): boolean {
    return ( window.innerWidth <= 1024 ) && ( window.innerHeight <= 1024 );
  }

  transformDate(value: any) {
    return this.datePipe.transform(value, 'MM-dd-yyyy');
  }
}
