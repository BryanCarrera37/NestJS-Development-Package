import { SelectQueryBuilder } from "typeorm";

export interface MultipleGetMethods<T> {
    getSelectQueryBuilder(): SelectQueryBuilder<T>;
}