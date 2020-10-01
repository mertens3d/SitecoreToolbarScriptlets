import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";
import { IHindeSite_Observable } from "./IHindeSite_Observable";
import { LoggableBase } from "../../LoggableBase";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { StaticHelpers } from "../../Classes/StaticHelpers";
import { BufferChar } from "../../Enums/BufferChar";
import { BufferDirection } from "../../Enums/BufferDirection";

export class HindeSiteEvent_Subject<T> extends LoggableBase implements IHindeSite_Observable<T> {
  protected ObserverCollection: IHindSiteEvent_Observer<T>[] = [];
  readonly Friendly_Subject: string;
  private IsMuted: boolean;

  constructor(logger: ILoggerAgent, friendly: string) {
    super(logger);
    this.Friendly_Subject = friendly;
  }

  DisableNotifications() {
    this.IsMuted = true;
    //this.Logger.LogVal('Is Muted', this.IsMuted.toString());
  }
  EnableNotifications() {
    this.IsMuted = false;
    //this.Logger.LogVal('Is Muted', this.IsMuted.toString());
  }

  protected HasObservers(): boolean {
    return this.ObserverCollection && this.ObserverCollection.length > 0;
  }

  RegisterObserver(observer: IHindSiteEvent_Observer<T>): void {
    if (observer) {

      if (this.ObserverCollection.indexOf(observer) < 0) {
        this.ObserverCollection.push(observer);
        this.Logger.Log(this.RegisterObserver.name + ' ' + observer.Friendly + ' to ' + this.Friendly_Subject + ' - count after: ' + this.ObserverCollection.length.toString());
      } else {
        this.Logger.WarningAndContinue(this.RegisterObserver.name, 'Observer already registered');
      }
    } else {
      this.Logger.ErrorAndThrow(this.RegisterObserver.name, 'Observer is null');
    }
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

  NotifyObserversAsync(payload: T): void {
    let bufferedFriendly = StaticHelpers.BufferString(this.Friendly_Subject, 20, BufferChar.Period, BufferDirection.right);
    this.Logger.FuncStart(this.NotifyObserversAsync.name + ' of: ' + bufferedFriendly, ' obs. count: ' + this.ObserverCollection.length);

    if (!this.IsMuted) {
      this.ObserverCollection.forEach((observer) => {
        observer.UpdateAsync(payload);
      });
    } else {
      this.Logger.Log('not Notifying...Subject is muted');
    }
    this.Logger.FuncEnd(this.NotifyObserversAsync.name + ' of: ' + bufferedFriendly, ' obs. count: ' + this.ObserverCollection.length);
  }
}