import { LoggableBase } from "../../../../../HindSiteScUiProxy/scripts/Managers/LoggableBase";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { HindSiteSetting } from "./HindSiteSetting";

export class HindSiteSettingWrapper extends LoggableBase {
  HindSiteSetting: IHindSiteSetting;

  constructor(logger: ILoggerAgent,  hindSiteSetting: HindSiteSetting) {
    super(logger);

    this.HindSiteSetting = hindSiteSetting;

  }
}