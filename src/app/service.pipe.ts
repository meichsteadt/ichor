import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'service',
  pure: false
})
export class ServicePipe implements PipeTransform {
  transform(arr, service){
    if(arr){
      let arr2 = [];
      for(let i=0; i < arr.length; i++) {
        if(service === "all") {
          return arr;
        }
        else if(arr[i].services) {
          if(arr[i].services[service]) {
            arr2.push(arr[i]);
          }
        }
      }
      return arr2;
    }
  }

}
