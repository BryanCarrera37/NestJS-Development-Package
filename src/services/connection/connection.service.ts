import { Logger } from "@nestjs/common";
import { DatabaseResultHelperService, EnvironmentHelperService } from "../../helpers";
import { DataSource } from "typeorm";

export abstract class ConnectionService {

    private static _connection: DataSource;

    private resolveConnectionEstablished: () => void;

    protected readonly environmentHelper: EnvironmentHelperService;
    protected readonly databaseResultHelper: DatabaseResultHelperService;
    protected logger: Logger;
    protected connection: DataSource;

    /**
     * It consists of been a promise that you can use to determine when the connection is established
     */
    public connectionEstablished: Promise<void>;

    constructor() {
        this.environmentHelper = new EnvironmentHelperService();
        this.databaseResultHelper = new DatabaseResultHelperService();
        this.initializeConnection();
    }

    /**
     * You have to call this method in your constructor with the objective of initialize the class's logger
     */
    protected abstract initializeLogger(): void;

    /**
     * You only have to define this method. The method is called by the **initializeConnection** method to establish the connection with the database
     */
    protected abstract getDataSource(): DataSource;

    /**
     * This method is called in the constructor and it's responsible to initialize the database connection given in the abstract method named **getDataSource**
     */
    protected async initializeConnection() {
        this.initializeResolveConnectionEstablished();
        if(!ConnectionService._connection) {
            ConnectionService._connection = this.getDataSource();
        }

        if(!ConnectionService._connection.isInitialized) {
            await ConnectionService._connection.initialize();
        }

        this.connection = ConnectionService._connection;
        this.resolveConnectionEstablished();
    }

    private initializeResolveConnectionEstablished(): void {
        this.connectionEstablished = new Promise<void>((resolve) => {
            this.resolveConnectionEstablished = resolve;
        });
    }
}