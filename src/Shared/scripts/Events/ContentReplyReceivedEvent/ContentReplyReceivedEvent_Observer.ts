import { ICommonCore } from "../../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { IControllerMessageReceivedEvent_Payload } from "./IDataContentReplyReceivedEvent_Payload";
import { _HindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindSiteEvent_Observer";
import { HindsiteEventHandler_Type } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindsiteEventHandler_Type";
import { IHindSiteEvent_Observer } from "../../../../Shared/scripts/Events/_HindSiteEvent/IHindSiteEvent_Observer";
import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";

export class ContentReplyReceivedEvent_Observer extends _HindSiteEvent_Observer<IControllerMessageReceivedEvent_Payload> implements IHindSiteEvent_Observer<IControllerMessageReceivedEvent_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.ContentReplyReceivedEvent_Observer;

  constructor(hindeCore: ICommonCore, callback: HindsiteEventHandler_Type) {
    super(hindeCore, ContentReplyReceivedEvent_Observer.name, callback);
  }
}