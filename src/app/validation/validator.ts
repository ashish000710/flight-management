import { AbstractControl } from '@angular/forms';

export function commonValidator(control: AbstractControl) {
    const source = control.get('departure')?.value;
    const destination = control.get('destination')?.value;
    const departureDate = control.get('departureDate')?.value;
    const returnDate = control.get('returnDate')?.value;
    if ((source !== null && destination !== null) && (destination.value === source.value)) {
        control.get('destination')?.setErrors({ destinationValidator: true });
    } else {
        delete control.get('destination')?.errors?.destinationValidator;
    }
    if ((departureDate !== null && returnDate !== null) && (departureDate > returnDate)) {
        control.get('returnDate')?.setErrors({ samereturnDate: true });
    } else {
        delete control.get('returnDate')?.errors?.samereturnDate;
    }
}

