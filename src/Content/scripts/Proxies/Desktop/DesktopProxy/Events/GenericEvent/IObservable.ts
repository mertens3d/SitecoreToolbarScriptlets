import { IGeneric_Observer } from "./IGeneric_Observer";

export interface IObservable<T> {
    RegisterObserver(observer: IGeneric_Observer<T>): void;
    NotifyObservers(payload: T): void;

}
