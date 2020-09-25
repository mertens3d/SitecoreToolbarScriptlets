import { LoggableBase } from "../../LoggableBase";
import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { HindsiteEventHandler_Type } from "./HindsiteEventHandler_Type";

export class HindSiteEvent_Observer<T> extends LoggableBase implements IHindSiteEvent_Observer<T> {
  readonly Friendly: string;
  Callback: HindsiteEventHandler_Type = null;

  UpdateAsync(payload: T): void {
    try {
      if (this.Callback) {
        this.Callback(payload);
      }
    } catch (err) {
      this.Logger.ErrorAndContinue(HindSiteEvent_Observer.name, err);
    }
  }
  constructor(logger: ILoggerAgent, friendly: string, callback: HindsiteEventHandler_Type = null) {
    super(logger);
    this.Callback = callback;
    this.Friendly = friendly;
  }
}