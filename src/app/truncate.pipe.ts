import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string): any {
    let arr = value.split(' ');
    let truncated = [];
    let length;
    let long = false;
    if(arr.length > 30) {
      length = 30;
      long = true;
    }
    else {
      length = arr.length
    }
    for(let i=0; i<length; i++) {
      truncated.push(arr[i]);
    }
    if(long) {
      truncated[truncated.length - 1] += '...';
    }
    return truncated.join(' ');
  }

}
