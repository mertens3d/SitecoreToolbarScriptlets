import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { HindsiteEventHandler_Type } from "../_HindSiteEvent/HindsiteEventHandler_Type";
import { _HindSiteEvent_Observer } from '../_HindSiteEvent/HindSiteEvent_Observer';
import { IHindSiteEvent_Observer } from '../_HindSiteEvent/IHindSiteEvent_Observer';
import { ISingleClickEvent_Payload } from "./ISingleClickEvent_Payload";

export class SingleClickEvent_Observer extends _HindSiteEvent_Observer<ISingleClickEvent_Payload> implements IHindSiteEvent_Observer<ISingleClickEvent_Payload> {

  readonly TypeDiscriminator = TypeDiscriminator.SingleClickEvent_Observer;

  constructor(commonCore: ICommonCore, callback: HindsiteEventHandler_Type) {
        super(commonCore, SingleClickEvent_Observer.name, callback);
    }

}
