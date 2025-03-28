import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EnvKeys, EnvPlatforms } from '../const-values/env';
import { FileHelperService } from './file-helper.service';
import { parse } from 'dotenv';

/**
 * @deprecated Since **v1.2.0**
 *
 * **Reason:** This class has some functionalities that can be used to get values from your **Environment Variables' file**
 * But, since **Node.js** has a functionality that includes your variables into **process.env** (https://medium.com/@deepak.k.dev/node-jss-new-approach-to-efficient-environment-management-16aa460ad93d)
 * it's not necessary to have this class.
 *
 * **Important:** This class will be deleted in **v2.0.0**.
 *
 * **Recommendation:** Implement the **loadEnvFile()** method which is native from **Node.js** and **joi** to validate your schema.
 */
@Injectable()
export class EnvironmentHelperService {
  private static _values: { [key: string]: string };
  private static readonly _fileHelper: FileHelperService = new FileHelperService();

  constructor() {}

  /**
   * Returns an Integer saved in the Environment File
   * @param key The variable's name saved in the Environment File
   * @returns The value of the variable
   */
  getInteger(key: string): number {
    try {
      const value = this.getString(key);
      if (!parseInt(value)) {
        throw new InternalServerErrorException(`The value of the variable ${key} is not an Integer`);
      }

      return parseInt(value);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Returns if true or false depending in the value of variable defined in the Environment File
   * @returns true if the value for the Environment variable is equals to "production"
   * @returns false if the value for the Environment variable is not equals to "production"
   */
  isInProduction(): boolean {
    try {
      return this.getString(EnvKeys.ENVIRONMENT) === EnvPlatforms.PRODUCTION;
    } catch (ex) {
      throw ex;
    }
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
    } catch (ex) {
      throw ex;
    }
  }

  private validateBeforeGet(key: string): void {
    if (EnvironmentHelperService._values == null) {
      throw new InternalServerErrorException("It seems that the values weren't saved");
    }

    if (!EnvironmentHelperService._values[key]) {
      throw new InternalServerErrorException(`Cannot find the variable ${key}`);
    }
  }

  static saveEnv(path: string): void {
    try {
      this._values = parse(this._fileHelper.read(path));
    } catch (ex) {
      throw ex;
    }
  }
}
