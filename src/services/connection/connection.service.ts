import { Logger } from "@nestjs/common";
import { DatabaseResultHelperService, EnvironmentHelperService } from "../../helpers";
import { DataSource } from "typeorm";

export abstract class ConnectionService {

    private static _connection: DataSource;

    protected readonly environmentHelper: EnvironmentHelperService;
    protected readonly databaseResultHelper: DatabaseResultHelperService;
    protected logger: Logger;
    protected connection: DataSource;

    constructor() {
        this.environmentHelper = new EnvironmentHelperService();
        this.databaseResultHelper = new DatabaseResultHelperService();
        this.initializeConnection();
    }

    protected abstract initializeLogger(): void;
    protected abstract getDataSource(): DataSource;

    protected async initializeConnection() {
        if(!ConnectionService._connection) {
            ConnectionService._connection = this.getDataSource();
        }

        if(!ConnectionService._connection.isInitialized) {
            await ConnectionService._connection.initialize();
        }

        this.connection = ConnectionService._connection;
    }
}