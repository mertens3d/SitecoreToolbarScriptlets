import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";

export interface IHindeSite_Observable<T> {
  RegisterObserver(observer: IHindSiteEvent_Observer<T>): void;
  NotifyObserversAsync(payload: T): void;
}