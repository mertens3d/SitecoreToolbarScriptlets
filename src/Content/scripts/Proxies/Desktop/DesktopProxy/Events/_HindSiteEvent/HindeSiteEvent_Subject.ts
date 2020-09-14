import { LoggableBase } from "../../../../../Managers/LoggableBase";
import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";
import { IHindeSiteObservable } from "./IHindeSiteObservable";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";

export class HindeSiteEvent_Subject<T> extends LoggableBase implements IHindeSiteObservable<T> {
  protected ObserverCollection: IHindSiteEvent_Observer<T>[] = [];
  readonly Friendly_Subject: string;

  constructor(logger: ILoggerAgent, friendly: string) {
    super(logger);
    this.Friendly_Subject = friendly;
    this.Logger.InstantiateStart(this.Friendly_Subject);
    this.Logger.InstantiateEnd(this.Friendly_Subject);
  }

  protected HasObservers(): boolean {
    return this.ObserverCollection && this.ObserverCollection.length > 0;
  }

  RegisterObserver(observer: IHindSiteEvent_Observer<T>): void {
    this.Logger.FuncStart(this.RegisterObserver.name);
    if (observer) {
      this.Logger.Log(observer.Friendly + ' to ' + this.Friendly_Subject);

      if (this.ObserverCollection.indexOf(observer) < 0) {
        this.ObserverCollection.push(observer);
      } else {
        this.Logger.WarningAndContinue(this.RegisterObserver.name, 'Observer already registered');
      }
    } else {
      this.Logger.ErrorAndThrow(this.RegisterObserver.name, 'Observer is null');
    }
    this.Logger.FuncEnd(this.RegisterObserver.name);
  }

  UnregisterObserver(observer: IHindSiteEvent_Observer<T>): void {
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
    this.Logger.FuncStart(this.NotifyObservers.name + ' of: ' + this.Friendly_Subject, ' observer count: ' + this.ObserverCollection.length);
    this.ObserverCollection.forEach((observer) => {
      observer.UpdateAsync(payload);
    }
    );
    this.Logger.FuncEnd(this.NotifyObservers.name);
  }
}