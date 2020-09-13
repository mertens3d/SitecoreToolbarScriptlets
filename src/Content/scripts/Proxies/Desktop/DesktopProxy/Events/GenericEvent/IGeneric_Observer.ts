export interface IGeneric_Observer<T> {
  Friendly: string;
  UpdateAsync(payload: T): void;
}