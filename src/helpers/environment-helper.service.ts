import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EnvKeys, EnvPlatforms } from "../const-values/env";
import { FileHelperService } from "./file-helper.service";
import { parse } from "dotenv";

@Injectable()
export class EnvironmentHelperService {

    private static _values: { [key: string]: string };
    private static readonly _fileHelper: FileHelperService = new FileHelperService();

    constructor() { }

    /**
     * Returns an Integer saved in the Environment File
     * @param key The variable's name saved in the Environment File
     * @returns The value of the variable
     */
    getInteger(key: string): number {
        try {
            const value = this.getString(key);
            if(!parseInt(value)) {
                throw new InternalServerErrorException(`The value of the variable ${key} is not an Integer`);
            }

            return parseInt(value);
        }
        catch (ex) { throw ex; }
    }

    /**
     * Returns if true or false depending in the value of variable defined in the Environment File
     * @returns true if the value for the Environment variable is equals to "production"
     * @returns false if the value for the Environment variable is not equals to "production"
     */
    isInProduction(): boolean {
        try {
            return this.getString(EnvKeys.ENVIRONMENT) === EnvPlatforms.PRODUCTION;
        }
        catch (ex) { throw ex; }
    }

    /**
     * Returns an String saved in the Environment File
     * @param key The variable's name saved in the Environment File
     * @returns The value of the variable
     */
    getString(key: string): string {
        try {
            this.validateBeforeGet(key);
            return EnvironmentHelperService._values[key];
        }
        catch (ex) { throw ex; }
    }

    private validateBeforeGet(key: string): void {
        if(EnvironmentHelperService._values == null) {
            throw new InternalServerErrorException('It seems that the values weren\'t saved');
        }

        if(!EnvironmentHelperService._values[key]) {
            throw new InternalServerErrorException(`Cannot find the variable ${key}`);
        }
    }

    static saveEnv(path: string): void {
        try {
            this._values = parse(this._fileHelper.read(path));
        }
        catch (ex) { throw ex; }
    }
}