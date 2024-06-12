export interface CommonCrudActions<T, Creation, Modification> {
    getById(id: any): Promise<T>;
    create(data: Creation): Promise<T>;
    update(data: Modification, id: any): Promise<T>;
    remove(id: any): Promise<void>;
}