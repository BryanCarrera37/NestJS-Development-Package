import { Injectable } from "@nestjs/common";
import * as moment from 'momment';

@Injectable()
export class DateHelperService {

    getTheDiffInDays(dateToCompare: string): number {
        return moment().diff(moment(dateToCompare), 'days');
    }
}