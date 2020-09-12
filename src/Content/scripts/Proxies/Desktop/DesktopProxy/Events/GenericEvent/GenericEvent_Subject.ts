import { LoggableBase } from "../../../../../Managers/LoggableBase";
import { IGeneric_Observer } from "./IGeneric_Observer";
import { IObservable } from "./IObservable";

export class GenericEvent_Subject<T> extends LoggableBase implements IObservable<T> {
    protected ObserverCollection: IGeneric_Observer<T>[] = [];

    RegisterObserver(observer: IGeneric_Observer<T>): void {
        if (observer && this.ObserverCollection.indexOf(observer) < 0) {
            this.ObserverCollection.push(observer);
        }
    }

    UnregisterObserver(observer: IGeneric_Observer<T>): void {
        this.Logger.FuncStart(this.UnregisterObserver.name);
        if (observer) {
            let observerIndex = this.ObserverCollection.indexOf(observer);
            if (observerIndex > -1) {
                this.ObserverCollection.splice(observerIndex, 1);
            }
        }

        this.Logger.FuncEnd(this.UnregisterObserver.name);
    }

    NotifyObservers(payload: T): void {
        this.Logger.FuncStart(this.NotifyObservers.name, 'length: ' + this.ObserverCollection.length);
        this.ObserverCollection.forEach((observer) => observer.Update(payload));
        this.Logger.FuncEnd(this.NotifyObservers.name);
    }
}
