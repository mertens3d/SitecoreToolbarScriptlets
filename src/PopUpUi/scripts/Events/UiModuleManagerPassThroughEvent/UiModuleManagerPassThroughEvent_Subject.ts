import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IUiModuleManagerPassThroughEvent_Payload } from "./IUiModuleManagerPassThroughEvent_Payload";

export class UiModuleManagerPassThroughEvent_Subject extends HindeSiteEvent_Subject<IUiModuleManagerPassThroughEvent_Payload> {
  constructor(hindeCore: IHindeCore) {
    super(hindeCore, UiModuleManagerPassThroughEvent_Subject.name);
  }
}