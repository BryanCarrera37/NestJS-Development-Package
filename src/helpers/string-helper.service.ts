import { Injectable } from "@nestjs/common";

@Injectable()
export class StringHelperService {

    // Always have to receive the value DDMMYYYY
    addDelimiterToTheStringDate(stringDate: string, delimiter: string): string {
        return `${stringDate.substring(0, 2)}${delimiter}${stringDate.substring(2, 4)}${delimiter}${stringDate.substring(4)}`;
    }
}