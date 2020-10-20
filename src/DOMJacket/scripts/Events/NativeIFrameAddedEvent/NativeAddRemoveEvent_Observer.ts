import { HindsiteEventHandler_Type } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { INativeAddRemoveEvent_Payload } from "./INativeAddRemoveEvent_Payload";
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class NativeAddRemoveEvent_Observer extends HindSiteEvent_Observer<INativeAddRemoveEvent_Payload> implements IHindSiteEvent_Observer<INativeAddRemoveEvent_Payload> {

  readonly TypeDiscriminator = TypeDiscriminator.NativeAddRemoveEvent_Observer;

  constructor(commonCore: ICommonCore, callback: HindsiteEventHandler_Type) {
    super(commonCore, NativeAddRemoveEvent_Observer.name, callback);
  }
}