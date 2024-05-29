import { Injectable } from "@nestjs/common";
import * as moment from 'momment';

@Injectable()
export class DateHelperService {

    getCurrentDate(format?: string): string {
        return moment().format(format != undefined
            ? format
            : 'YYYY-MM-DD');
    }
    
    getTheDiffInDays(dateToCompare: string): number {
        return moment().diff(moment(dateToCompare), 'days');
    }
}