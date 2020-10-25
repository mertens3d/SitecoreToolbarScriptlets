import { _HindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISelectSnapUiMutationEvent_Payload } from "./ISelectSnapUiMutationEvent_Payload";
import { HindsiteEventHandler_Type } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class SelectSnapUiMutationEvent_ObserverWithCallback extends _HindSiteEvent_Observer<ISelectSnapUiMutationEvent_Payload> {

  readonly TypeDiscriminator = TypeDiscriminator.SelectSnapUiMutationEvent_ObserverWithCallback;

  constructor(hindeCore: IHindeCore, callback: HindsiteEventHandler_Type = null) {
    super(hindeCore, SelectSnapUiMutationEvent_ObserverWithCallback.name, callback);
  }
}
