import { StaticHelpers } from "../../Classes/StaticHelpers";
import { BufferChar } from "../../Enums/BufferChar";
import { BufferDirection } from "../../Enums/BufferDirection";
import { Discriminator } from "../../Interfaces/Agents/Discriminator";
import { IErrorHandlerAgent } from "../../Interfaces/Agents/IErrorHandlerAgent";
import { IHindeCore } from "../../Interfaces/Agents/IHindeCore";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { IHindeSite_Observable } from "./IHindeSite_Observable";
import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";

export class HindeSiteEvent_Subject<T> implements IHindeSite_Observable<T> {
  protected ObserverCollection: IHindSiteEvent_Observer<T>[] = [];
  readonly Friendly_Subject: string;
  private IsMuted: boolean;
  Logger: ILoggerAgent;
  ErrorHand: IErrorHandlerAgent;

  constructor(arg1Logger: ILoggerAgent, arg2ErrorHand: IErrorHandlerAgent, friendly: string )
  constructor(arg1hindeCore: IHindeCore, arg2Friendly: string)
  constructor(arg1: ILoggerAgent | IHindeCore, arg2: string | IErrorHandlerAgent, arg3: string = '') {
    let errorHandTest = <IErrorHandlerAgent>arg2;

    if (arg1.Discriminator == Discriminator.IHindeCore) {
      let hindeCore: IHindeCore = <IHindeCore>arg1;
      this.Logger = hindeCore.Logger;
      this.ErrorHand = hindeCore.ErrorHand;
      this.Friendly_Subject = <string>arg2
    }
    else if (arg1.Discriminator === Discriminator.ILoggerAgent && errorHandTest && errorHandTest.Discriminator === Discriminator.IErrorHandler) {
      this.Logger = <ILoggerAgent>arg1;
      this.ErrorHand = errorHandTest;
      this.Friendly_Subject = <string>arg3;
    } else {
      throw ('unhandled discriminator')
    }
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
        this.ErrorHand.WarningAndContinue(this.RegisterObserver.name, 'Observer already registered');
      }
    } else {
      this.ErrorHand.ErrorAndThrow(this.RegisterObserver.name, 'Observer is null');
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