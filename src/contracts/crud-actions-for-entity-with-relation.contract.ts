import { CommonCrudActions } from "./base";

export interface CrudActionsForEntityWithRelation<T, Creation, Modification>
extends CommonCrudActions<T, Creation, Modification> {
    getAll(relationFieldValue: any): Promise<T[]>;
}