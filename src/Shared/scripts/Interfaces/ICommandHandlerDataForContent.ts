import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent";
import { ContentMessageBroker } from "../../../Content/scripts/Proxies/ContentMessageBroker";
import { ScUiManager } from "../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { ContentEditorProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { GuidData } from "../Helpers/GuidData";
import { IHindSiteScWindowApi } from "./Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { ISettingsAgent } from "./Agents/ISettingsAgent";
import { IDataOneDoc } from "./Data/IDataOneDoc";

export interface IInternalCommandPayload {
  AutoSnapShotAgent: AutoSnapShotAgent;
  ApiPayload: IApiCallPayload;
  NewNickName: string;
  TargetSnapShotId: GuidData;
  AtticAgent: IContentAtticAgent;
  ScUiProxy: IHindSiteScWindowApi;

}
export interface IApiCallPayload {
}