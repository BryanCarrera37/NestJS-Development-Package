export interface CrudWithValidation<Creation, Modification> {
    validateBeforeCreate(data: Creation): Promise<void>;
    validateBeforeUpdate(data: Modification, id: any): Promise<void>;
}