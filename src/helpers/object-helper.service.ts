import { Injectable } from "@nestjs/common";

@Injectable()
export class ObjectHelperService {

    getObjectFromArrayNumber(values: number[], commonFieldName: string): Object {
        const outcome = {};
        for(let i = 0; i < values.length; i++) {
            outcome[String.prototype.concat(commonFieldName, (i + 1).toString())] = values[i];
        }
        
        return outcome;
    }

    getObjectWithoutNullValues(object: Object, ...includeEver: string[]): Object {
        const outcome = {};
        for(const key of Object.keys(object)) {
            if((!object[key] || (Array.isArray(object[key]) && object[key].length <= 0)) && !this.hasToIncludeInCaseNull(key, includeEver)) {
                continue;
            }

            outcome[key] = object[key];
        }
        return outcome;
    }

    private hasToIncludeInCaseNull(key: string, includeEver: string[]): boolean {
        return includeEver != undefined && includeEver.length > 0 && includeEver.includes(key);
    }
}