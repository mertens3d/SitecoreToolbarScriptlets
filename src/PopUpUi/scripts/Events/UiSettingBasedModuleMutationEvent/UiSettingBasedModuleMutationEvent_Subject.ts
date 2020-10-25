import { _HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IUiSettingBasedModuleMutationEven_Payload } from "./IUiSettingBasedModuleMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class UiSettingBasedModuleMutationEvent_Subject extends _HindeSiteEvent_Subject<IUiSettingBasedModuleMutationEven_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.UiSettingBasedModuleMutationEvent_Subject;
 protected ShowLogActions: boolean = true;
}