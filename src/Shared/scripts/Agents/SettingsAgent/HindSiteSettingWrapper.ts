import { IHindSiteSetting } from "../../Interfaces/Agents/IGenericSetting";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { HindSiteSetting } from "./HindSiteSetting";
import { _CommonBase } from "../../_CommonCoreBase";

export class HindSiteSettingWrapper extends _CommonBase {
  HindSiteSetting: IHindSiteSetting;

  constructor(hindeCore: ICommonCore,  hindSiteSetting: HindSiteSetting) {
    super(hindeCore);

    this.HindSiteSetting = hindSiteSetting;

  }
}