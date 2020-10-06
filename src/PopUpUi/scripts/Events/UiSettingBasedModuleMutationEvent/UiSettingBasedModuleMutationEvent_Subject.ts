import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IUiSettingBasedModuleMutationEven_Payload } from "./IUiSettingBasedModuleMutationEvent_Payload";

export class UiSettingBasedModuleMutationEvent_Subject extends HindeSiteEvent_Subject<IUiSettingBasedModuleMutationEven_Payload> {
  ShowLogActions: boolean = true;
  constructor(hindeCore: IHindeCore) {
    super(hindeCore, UiSettingBasedModuleMutationEvent_Subject.name);
  }
}