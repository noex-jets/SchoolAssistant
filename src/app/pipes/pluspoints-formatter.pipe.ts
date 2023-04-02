import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluspointsFormatter'
})
export class PluspointsFormatterPipe implements PipeTransform {

  transform(value: number): number {
    let result = value - 4;

    if (result < 0) {
      result *= 2;
    }

    if(result%0.5 > 0.25) {
      return result+(0.5-result%0.5)
    }
    else{
      
      return result-(result%0.5);
    }

  }

}
