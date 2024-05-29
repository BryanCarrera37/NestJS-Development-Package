import { Injectable } from "@nestjs/common";
import { DeleteResult, InsertResult, UpdateResult } from "typeorm";

@Injectable()
export class DatabaseResultHelperService {
    areNotThereRecords(possibleRecords: any[]): boolean {
        return !this.areThereRecordsWhenFetchingThem(possibleRecords);
    }
    
    areThereRecordsWhenFetchingThem(possibleRecords: any[]): boolean {
        return possibleRecords && (Array.isArray(possibleRecords) && possibleRecords.length != 0);
    }
    
    wasNotInserted(insertionResult: InsertResult): boolean {
        return (!insertionResult || !insertionResult.identifiers || !insertionResult.raw || insertionResult.raw.affectedRows <= 0);
    }

    wasNotUpdated(modificationResult: UpdateResult) {
        return (!modificationResult) || modificationResult.affected <= 0;
    }

    wasNotDeleted(result: DeleteResult): boolean {
        return result == undefined || result.affected <= 0;
    }
}