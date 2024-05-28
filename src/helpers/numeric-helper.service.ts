import { Injectable } from "@nestjs/common";

@Injectable()
export class NumericHelperService {

    sumValues(values: number[]): number {
        let outcome = 0;
        values.forEach((value: number) => { outcome += value; });
        
        return outcome;
    }
    
    getNumberFromPercentage(percentage: string): number {
        return percentage.length === 3
            ? parseInt(percentage.substring(0, 2))
            : parseInt(percentage.substring(0, 1));
    }
}