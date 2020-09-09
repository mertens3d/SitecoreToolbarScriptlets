import { LoggableBase } from "../../../../../Managers/LoggableBase";
import { IObservable } from "../../../../../../../Shared/scripts/Interfaces/Events/IObservable";

export class GenericEvent_Subject<T> extends LoggableBase implements IObservable {
    protected ObserverCollection: Function[] = [];

    RegisterObserver(observer: Function): void {
        if (observer && this.ObserverCollection.indexOf(observer) < 0) {
            this.ObserverCollection.push(observer);
        }
    }


    UnregisterObserver(observer: Function): void {
        this.Logger.FuncStart(this.UnregisterObserver.name);
        if (observer) {
            let observerIndex = this.ObserverCollection.indexOf(observer);
            if (observerIndex > -1) {
                this.ObserverCollection.splice(observerIndex, 1);
            }
        }

        this.Logger.FuncEnd(this.UnregisterObserver.name);
    }

  NotifyObservers<T>(payload: T): void {
    this.Logger.FuncStart(this.NotifyObservers.name, 'length: ' +  this.ObserverCollection.length);
    this.ObserverCollection.forEach((observer) => observer(payload));
    this.Logger.FuncEnd(this.NotifyObservers.name);
    }
}
