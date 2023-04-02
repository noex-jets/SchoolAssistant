import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: any): string {
    let date = new Date(value.toDate())
    return date.toLocaleDateString('ch-de', {dateStyle: 'full'});
  }

}
