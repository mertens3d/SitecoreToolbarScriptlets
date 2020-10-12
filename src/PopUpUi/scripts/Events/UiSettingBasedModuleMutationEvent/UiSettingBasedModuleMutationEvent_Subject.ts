import { HindeSiteEvent_Subject } from "../../../../Shared/scripts/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IUiSettingBasedModuleMutationEven_Payload } from "./IUiSettingBasedModuleMutationEvent_Payload";
import { TypeDiscriminator } from "../../../../Shared/scripts/Enums/70 - TypeDiscriminator";

export class UiSettingBasedModuleMutationEvent_Subject extends HindeSiteEvent_Subject<IUiSettingBasedModuleMutationEven_Payload> {
  readonly TypeDiscriminator = TypeDiscriminator.UiSettingBasedModuleMutationEvent_Subject;
  ShowLogActions: boolean = true;
}