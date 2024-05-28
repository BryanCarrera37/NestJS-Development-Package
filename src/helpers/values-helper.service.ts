import { Injectable } from "@nestjs/common";

@Injectable()
export class ValuesHelperService {

  getDistinctValues(values: any[]) {
    return values.filter(this.onlyUnique);
  }

  getValuesPreparedForWhereClauseWithIn(values: number[] | string[]) {
    let result = '';
    for(let i = 0; i < values.length; i++) {
      result += (i == values.length - 1) ? values[i] : `${values[i]}, `;
    }
     
    return result;
  }
    
  private onlyUnique(value: any, index: number, values: any[]) {
    return values.indexOf(value) === index;
  }
}