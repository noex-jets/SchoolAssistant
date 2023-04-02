import { SubjectService } from './services/subject.service';
import { Auth } from '@angular/fire/auth';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { query } from '@firebase/firestore';

export class CustomValidators {

  constructor( 
    private subjectService: SubjectService,

  ) {

  }

    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            // if control is empty return no error
            return null;
          }
      
          // test the value of the control against the regexp supplied
          const valid = regex.test(control.value);
      
          // if true, return no error (no error), else return error passed in the second parameter
          return valid ? null : error;
        };
      }
    
    static lengthValidator(error: ValidationErrors): ValidatorFn {
      return (control: AbstractControl): { [key: string]:any} => {
        if(!control.value) {
          return null;
        }

        const valid = control.value.length

        if(valid <= 8){
          return error
        }
      }
    }

}
