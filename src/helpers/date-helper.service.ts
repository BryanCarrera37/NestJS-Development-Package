import { Injectable } from "@nestjs/common";
import * as moment from 'moment';

@Injectable()
export class DateHelperService {

    private static readonly defaultFormat = 'YYYY-MM-DD HH:mm:ss';

    getCurrentDate(format?: string): string {
        return moment().format(format != undefined
            ? format
            : DateHelperService.defaultFormat);
    }

    getDateReduced(daysToReduce: number, format?: string): string {
        return moment().subtract(daysToReduce, 'days').format(format != undefined
            ? format
            : DateHelperService.defaultFormat
        );
    }
    
    getTheDiffInDays(dateToCompare: string): number {
        return moment().diff(moment(dateToCompare), 'days');
    }
}