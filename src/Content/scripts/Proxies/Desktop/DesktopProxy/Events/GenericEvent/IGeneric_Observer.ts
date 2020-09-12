export interface IGeneric_Observer<T> {
    Friendly: string;
    Update(payload: T);
}
