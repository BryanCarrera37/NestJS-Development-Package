import { Logger } from "@nestjs/common";

export interface WithLogger {
    logger: Logger;
    initializeLogger(): void;
}