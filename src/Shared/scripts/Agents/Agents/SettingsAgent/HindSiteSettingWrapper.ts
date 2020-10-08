import { _HindeCoreBase } from "../../../_HindeCoreBase";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { IHindeCore } from "../../../Interfaces/Agents/IHindeCore";
import { HindSiteSetting } from "./HindSiteSetting";

export class HindSiteSettingWrapper extends _HindeCoreBase {
  HindSiteSetting: IHindSiteSetting;

  constructor(hindeCore: IHindeCore,  hindSiteSetting: HindSiteSetting) {
    super(hindeCore);

    this.HindSiteSetting = hindSiteSetting;

  }
}