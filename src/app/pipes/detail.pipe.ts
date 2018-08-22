import { Pipe, PipeTransform } from '@angular/core';
import { Income } from '../models/expense.model';

@Pipe({
  name: 'sortDetailPipe'
})
export class DetailPipe implements PipeTransform
{
  transform(expense: Income[], args?: any): Income[]
  {
    return expense.sort((a, b) => {
      return (a.typed === 'Ingreso' ? -1:1);
    });
  }

}
