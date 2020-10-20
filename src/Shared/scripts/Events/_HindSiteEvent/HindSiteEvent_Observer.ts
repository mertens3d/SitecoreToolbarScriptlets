import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { _CommonBase } from "../../_CommonCoreBase";
import { HindsiteEventHandler_Type } from "./HindsiteEventHandler_Type";
import { IHindSiteEvent_Observer } from "./IHindSiteEvent_Observer";

export abstract class HindSiteEvent_Observer<T> extends _CommonBase implements IHindSiteEvent_Observer<T> {
  readonly Friendly: string;
  CallbackAsync: HindsiteEventHandler_Type = null;

  UpdateAsync(payload: T): void {
    try {
      if (this.CallbackAsync) {
        this.CallbackAsync(payload);
      }
    } catch (err: any) {
      this.ErrorHand.ErrorAndContinue(HindSiteEvent_Observer.name, err);
    }
  }
  constructor(hindeCore: ICommonCore, friendly: string, callbackAsync: HindsiteEventHandler_Type = null) {
    super(hindeCore);
    this.CallbackAsync = callbackAsync;
    this.Friendly = friendly;
  }
}