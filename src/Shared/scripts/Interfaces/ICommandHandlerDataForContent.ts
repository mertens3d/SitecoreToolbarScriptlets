import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent/AutoSnapShotAgent";
import { ContentMessageBroker } from "../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { ScUiManager } from "../../../Content/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { IContentEditorProxy, IDesktopProxy, IDesktopStartBarProxy } from "./Proxies/IDesktopProxy";
import { GuidData } from "../Helpers/GuidData";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "./Agents/ILoggerAgent";
import { IScWindowManager } from "./Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "./Agents/ISettingsAgent";
import { IToastAgent } from "./Agents/IToastAgent";
import { IDataOneDoc } from "./Data/IDataOneDoc";
import { IContentBrowserProxy } from "./Agents/IContentBrowserProxy";

export interface ICommandHandlerDataForContent {
  AtticAgent: IContentAtticAgent;
  AutoSnapShotAgent: AutoSnapShotAgent,
  ContentBrowserProxy: IContentBrowserProxy;
  ContentMessageBroker: ContentMessageBroker,
  DesktopProxy: IDesktopProxy;
  DesktopStartBarProxy: IDesktopStartBarProxy,
  Logger: ILoggerAgent;
  NewNickName: string;
  ScUiMan: ScUiManager;
  ScWinMan: IScWindowManager;
  SettingsAgent: ISettingsAgent;
  TargetCeProxy: IContentEditorProxy
  TargetDoc: IDataOneDoc;
  TargetSnapShotId: GuidData;
  ToastAgent: IToastAgent;
  TopLevelDoc(): IDataOneDoc,
}