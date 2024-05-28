import { DynamicModule, Module } from "@nestjs/common";
import { DevelopmentPackageOptions } from "./types";
import { PROVIDERS } from "./providers";
import { EnvironmentHelperService } from "./helpers";

@Module({
    providers: PROVIDERS
})
export class DevelopmentPackageModule {
    
    static forRoot(options: DevelopmentPackageOptions): DynamicModule {
        EnvironmentHelperService.saveEnv(options.envFilePath);
        return {
            global: true,
            module: DevelopmentPackageModule,
            providers: PROVIDERS,
            exports: PROVIDERS
        }
    }
}