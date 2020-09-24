import { HindeSiteEvent_Subject } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/_HindSiteEvent/HindeSiteEvent_Subject";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiSettingBasedModuleMutationEven_Payload } from "./IUiSettingBasedModuleMutationEvent_Payload";

export class UiSettingBasedModuleMutationEvent_Subject extends HindeSiteEvent_Subject<IUiSettingBasedModuleMutationEven_Payload> {
  constructor(logger: ILoggerAgent) {
    super(logger, UiSettingBasedModuleMutationEvent_Subject.name);
  }
}