// export class FlightDetailModel {
//     name: string = "Alpha Airlines";
//     id: string = "abc123"
//     logo?: string = "alpha_airlines";
//     departure: DepartureModel = {
//         'id': '2', 
//         'name': 'Chennai', 
//         'code': 'CHN'
//     };
//     destination: DepartureModel = {
//         'id': '0', 
//         'name': 'Mumbai', 
//         'code': 'BOM'
//     };
//     departureTime: number = new Date().getTime();
//     departureDateString?: string = '';
//     journeyTime: number = 5400000;
//     journeyTimeString: string = '';
//     arrivalTime: number = new Date((this.departureTime + this.journeyTime)).getTime();
//     arrivalDateString: string = '';
//     returnDate?: number = new Date().getTime();
//     returnDateString?: string;
//     // travellers: TravellerModel = new TravellerModel();
//     class: Array<seatingClass> = [{
//         'id': 'economy',
//         'name': 'Economy'
//     }, {
//         'id': 'first_class',
//         'name':  'First Class'
//     }];
//     availableSeatsCount: number = 100;
//     journeyDuration: string = '14h 20m';
//     HaultNumbers: number = 0;
//     haultDetails: Array<HaultModel> = new Array<HaultModel>(); 
//     // priceList: Array<pricingModel> = [{
//     //     classId: 'economy',
//     //     className: 'Economy',
//     //     amount: 3500,
//     //     currency: 'Rs',
//     //     seatAvailable: 20
//     // }, {
//     //     classId: 'first_class',
//     //     className: 'Premium',
//     //     amount: 15000,
//     //     currency: 'Rs',
//     //     seatAvailable: 20
//     // }];
//     priceMap = {
//         economy: {
//             classId: 'economy',
//             className: 'Economy',
//             amount: 3500,
//             currency: 'Rs',
//             seatAvailable: 20
//         }, 
//         premium: {
//             classId: 'premium',
//             className: 'Premium',
//             amount: 15000,
//             currency: 'Rs',
//             seatAvailable: 40
//     }};
// }
export class FlightDetailModel {
    name: string;
    id: string;
    logo?: string;
    departure: DepartureModel;
    destination: DepartureModel;
    departureTime: number;
    departureDateString?: string;
    journeyTime: number;
    journeyTimeString: string;
    arrivalTime: number;
    arrivalDateString: string;
    returnDate?: number;
    returnDateString?: string;
    class: Array<seatingClass>;
    availableSeatsCount: number;
    journeyDuration: string;
    HaultNumbers: number;
    haultDetails: Array<HaultModel>;
    // priceList: Array<pricingModel> = [{
    //     classId: 'economy',
    //     className: 'Economy',
    //     amount: 3500,
    //     currency: 'Rs',
    //     seatAvailable: 20
    // }, {
    //     classId: 'first_class',
    //     className: 'Premium',
    //     amount: 15000,
    //     currency: 'Rs',
    //     seatAvailable: 20
    // }];
    priceMap = {
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
            seatAvailable: 40
    }};
}

export interface DepartureModel {
    id: string;
    name: String;
    code: string;
}

export class TravellerModel {
    adult: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // child: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // infant: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}

export interface seatingClass {
    id: string;
    name: string;
}

export interface PricingModel {
    classId: string;
    className: String;
    amount: number;
    currency: string;
    seatAvailable: number;
}

export interface BookingClassDropdownModel extends PricingModel {
    isSelected: boolean;
}

export class SortingModel {
    id: string = '';
    name: string = '';
}

export class HaultModel {
    departure: DepartureModel = {
        id: '',
        name: '',
        code: ''
    };
    arrivalTime: number = new Date().getTime();
    departureTime: number = new Date().getTime();
}

export class FlightFilterModel {
    minPrice: number = -1;
    maxPrice: number = -1;
    bookingClass: Array<string> = [];
}

export interface ITab {
    title: string;
    content: string;
    active?: boolean;
    customClass?: string;
}

export class FlightSearchModel {
    departure: SimpleDropdownItem;
    destination: SimpleDropdownItem;
    departureDate: Date;
    returnDate: Date;
    travellers: SimpleDropdownItem;
    class: SimpleDropdownItem;
}

export class DropdownModel<T> {
    count: number;
    list: Array<T>;
}

export interface SimpleDropdownItem {
    id: number;
    name: string;
    value?: any;
    isSelected?: boolean;
}
