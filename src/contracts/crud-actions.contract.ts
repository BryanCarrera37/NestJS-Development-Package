import { CommonCrudActions } from "./base";

export interface CrudActions<T, Creation, Modification>
extends CommonCrudActions<T, Creation, Modification> {
    getAll(): Promise<T[]>;
}