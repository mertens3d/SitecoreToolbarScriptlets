import { LoggableBase } from "../../../../../Managers/LoggableBase";
import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";
import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";

export type HindsiteEventHandler_Type = <T>(t: T) => void;

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