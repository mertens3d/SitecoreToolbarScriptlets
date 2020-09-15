import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";

export interface IHindeSiteObservable<T> {
    RegisterObserver(observer: IHindSiteEvent_Observer<T>): void;
    NotifyObservers(payload: T): void;

}
