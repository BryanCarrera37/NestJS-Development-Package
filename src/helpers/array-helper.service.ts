import { Injectable } from "@nestjs/common";

@Injectable()
export class ArrayHelperService {

    /**
     * Verify if an array is not empty
     * @param array Collection of any type
     * @returns true if the given collection (array) is not empty
     */
    isNotEmpty(array: any[]): boolean {
        return !this.isEmpty(array);
    }

    isEmpty(array: any[]): boolean {
        return array == undefined || array.length <= 0;
    }

    createAndFill(fillValue: any, amountOfItems: number): any[] {
        const outcome = [];
        for(let i = 0; i < amountOfItems; i++) {
            outcome.push(fillValue);
        }

        return outcome;
    }
}