import { PipeTransform } from "@nestjs/common";

export class CustomParseBoolPipe implements PipeTransform {

    transform(value: string): boolean | undefined {
        return value === undefined
            ? undefined
            : value === 'true'
                ? true
                : false;
    }
}