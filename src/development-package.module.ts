import { DynamicModule, Module } from '@nestjs/common';
import { DevelopmentPackageOptions } from './types';
import { PROVIDERS } from './providers';
import { EnvironmentHelperService } from './helpers';

@Module({
  providers: PROVIDERS,
})
export class DevelopmentPackageModule {
  /**
   * @deprecated Since **v1.2.0**
   *
   * **Reason:** This method expects to receive an object that includes the **Environment File's path**, so that, It'll be able to read it.
   * But, since **Node.js** has a functionality that includes your variables into **process.env** (https://medium.com/@deepak.k.dev/node-jss-new-approach-to-efficient-environment-management-16aa460ad93d)
   * it's not necessary to use this method **(see Recommendation)**.
   *
   * **Important:** This method will be deleted in **v2.0.0**.
   *
   * **Recommendation:** Implement the **loadEnvFile()** method which is native from **Node.js** and **joi** to validate your schema.
   *
   * @param options An object that includes a field named **envFilePath**, where your **Environment File's path** must be included.
   * @returns A **DynamicModule** that includes the definition for all the providers available.
   */
  static forRoot(options: DevelopmentPackageOptions): DynamicModule {
    EnvironmentHelperService.saveEnv(options.envFilePath);
    return {
      global: true,
      module: DevelopmentPackageModule,
      providers: PROVIDERS,
      exports: PROVIDERS,
    };
  }
}
