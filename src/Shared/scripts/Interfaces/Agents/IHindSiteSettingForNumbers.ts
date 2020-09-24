import { IHindSiteSetting } from "./IGenericSetting";

export interface IHindSiteSettingForNumbers extends IHindSiteSetting {
    Min: number;
    Max: number;
}
