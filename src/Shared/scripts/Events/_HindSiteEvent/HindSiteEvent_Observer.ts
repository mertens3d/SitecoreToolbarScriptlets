import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";
import { HindsiteEventHandler_Type } from "./HindsiteEventHandler_Type";
import { _HindeCoreBase } from "../../LoggableBase";
import { IHindeCore } from "../../Interfaces/Agents/IHindeCore";

export class HindSiteEvent_Observer<T> extends _HindeCoreBase implements IHindSiteEvent_Observer<T> {
  readonly Friendly: string;
  CallbackAsync: HindsiteEventHandler_Type = null;

  UpdateAsync(payload: T): void {
    try {
      if (this.CallbackAsync) {
        this.CallbackAsync(payload);
      }
    } catch (err) {
      this.ErrorHand.ErrorAndContinue(HindSiteEvent_Observer.name, err);
    }
  }
  constructor(hindeCore: IHindeCore, friendly: string, callbackAsync: HindsiteEventHandler_Type = null) {
    super(hindeCore);
    this.CallbackAsync = callbackAsync;
    this.Friendly = friendly;
  }
}