import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evenNumbers'
})
export class EvenNumbersPipe implements PipeTransform {

  transform(array: any[]): any[] {
// console.log(array)
//     if(array%2===0) {
//       return array
//     }
// return 
//   }

if(!array){
  return []
}
return array.filter(num => num%2 === 0)
}

}
