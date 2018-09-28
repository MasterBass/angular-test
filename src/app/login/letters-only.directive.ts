import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

@Directive({
    selector: '[appLettersOnly]',
    providers: [{provide: NG_VALIDATORS, useExisting: LettersOnlyValidatorDirective, multi: true}]
})
export class LettersOnlyValidatorDirective implements Validator {
    @Input('appLettersOnly') lettersOnly: string;

    lettersOnlyValidator(nameRe: RegExp): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const forbidden = !nameRe.test(control.value);
            return forbidden ? {'lettersOnly': {value: control.value}} : null;
        };
    }

    validate(control: AbstractControl) {
        return this.lettersOnly ? this.lettersOnlyValidator(new RegExp('^[a-zA-Z]+$'))(control)
            : null;
    }

}