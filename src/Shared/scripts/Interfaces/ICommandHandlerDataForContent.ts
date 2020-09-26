import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent";
import { GuidData } from "../Helpers/GuidData";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "./Agents/ILoggerAgent";
import { IScWindowManager } from "./Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "./Agents/ISettingsAgent";
import { IToastAgent } from "./Agents/IToastAgent";
import { IDataOneDoc } from "./Data/IDataOneDoc";
import { ContentMessageBroker } from "../../../Content/scripts/Proxies/ContentMessageBroker";
import { ContentEditorProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { ScUiManager } from "../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";

export interface InternalCommandPayload {
  ApiPayload: IApiCommandPayload;
  NewNickName: string;
  TargetSnapShotId: GuidData;
  AtticAgent: IContentAtticAgent;

}
export interface IApiCommandPayload {
  SettingsAgent: ISettingsAgent;
  DesktopProxy: DesktopProxy;
  TargetCeProxy: ContentEditorProxy
  TargetDoc: IDataOneDoc;
  ScWinMan: IScWindowManager;
  ScUiMan: ScUiManager;
  ToastAgent: IToastAgent;
  AtticAgent: IContentAtticAgent;
  Logger: ILoggerAgent;
  ContentMessageBroker: ContentMessageBroker,
  TopLevelDoc(): IDataOneDoc,
  AutoSnapShotAgent: AutoSnapShotAgent
}