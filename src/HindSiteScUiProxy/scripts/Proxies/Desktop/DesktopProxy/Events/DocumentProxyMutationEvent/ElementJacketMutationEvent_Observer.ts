import { HindsiteEventHandler_Type } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { HindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { IHindSiteEvent_Observer } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { IAPICore } from "../../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IElementJacketMutationEvent_Payload } from "./IElementJacketMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../../../../Shared/scripts/Enums/70 - TypeDiscriminator";


export class ElementJacketMutationEvent_Observer extends HindSiteEvent_Observer<IElementJacketMutationEvent_Payload> implements IHindSiteEvent_Observer<IElementJacketMutationEvent_Payload> {
    readonly TypeDiscriminator = TypeDiscriminator.ElementJacketMutationEvent_Observer;

    constructor(apiCore: IAPICore, callback: HindsiteEventHandler_Type) {
        super(apiCore, ElementJacketMutationEvent_Observer.name, callback);
    }
}
