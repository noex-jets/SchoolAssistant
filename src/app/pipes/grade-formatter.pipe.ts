import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gradeFormatter'
})
export class GradeFormatterPipe implements PipeTransform {

  transform(value: number, digits: number): number {
    if(value%digits > digits/2) {
      return value + (digits-(value%digits))
    }
    else{
      return value - (value%digits)
    }
  }

}
