﻿import { _HindeCoreBase } from "../../../LoggableBase";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { IHindeCore } from "../../../Interfaces/Agents/ILoggerAgent";
import { HindSiteSetting } from "./HindSiteSetting";

export class HindSiteSettingWrapper extends _HindeCoreBase {
  HindSiteSetting: IHindSiteSetting;

  constructor(hindeCore: IHindeCore,  hindSiteSetting: HindSiteSetting) {
    super(hindeCore);

    this.HindSiteSetting = hindSiteSetting;

  }
}