﻿import { IHindeCore } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDTFrameProxyMutationEvent_Payload } from "./IDTFrameProxyMutationEvent_Payload";
import { HindeSiteEvent_Subject } from "../../../../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";

export class DTFrameProxyMutationEvent_Subject extends HindeSiteEvent_Subject<IDTFrameProxyMutationEvent_Payload> {
  constructor(hindeCore: IHindeCore) {
    super(hindeCore, DTFrameProxyMutationEvent_Subject.name);
  }
}