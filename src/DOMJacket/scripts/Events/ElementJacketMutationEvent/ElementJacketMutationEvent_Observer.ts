import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { HindsiteEventHandler_Type } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { _HindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { IElementJacketMutationEvent_Payload } from "./IElementJacketMutationEvent_Payload";


export class ElementJacketMutationEvent_Observer extends _HindSiteEvent_Observer<IElementJacketMutationEvent_Payload> implements IHindSiteEvent_Observer<IElementJacketMutationEvent_Payload> {
    readonly TypeDiscriminator = TypeDiscriminator.ElementJacketMutationEvent_Observer;

  constructor(apiCore: ICommonCore, callback: HindsiteEventHandler_Type) {
        super(apiCore, ElementJacketMutationEvent_Observer.name, callback);
    }
}
