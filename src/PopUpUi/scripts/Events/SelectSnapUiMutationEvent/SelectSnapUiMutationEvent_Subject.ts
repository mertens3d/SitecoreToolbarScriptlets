﻿import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISelectSnapUiMutationEvent_Payload } from "./ISelectSnapUiMutationEvent_Payload";

export class SelectSnapUiMutationEvent_Subject extends HindeSiteEvent_Subject<ISelectSnapUiMutationEvent_Payload> {
  constructor(hindeCore: IHindeCore) {
    super(hindeCore, SelectSnapUiMutationEvent_Subject.name);
  }
}