import { ContentMessageBroker } from "../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { ScUiManager } from "../../../Content/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { GuidData } from "../Helpers/GuidData";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "./Agents/ILoggerAgent";
import { IScWindowManager } from "./Agents/IScWindowManager/IScWindowManager";
import { IToastAgent } from "./Agents/IToastAgent";
import { IDataOneDoc } from "./Data/IDataOneDoc";
import { ContentEditorProxy } from "../../../Content/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ISettingsAgent } from "./Agents/ISettingsAgent";
import { DesktopProxy } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { AutoSnapShotAgent } from "../../../Content/scripts/Agents/AutoSnapShotAgent/AutoSnapShotAgent";

export interface ICommandHandlerDataForContent {
  NewNickName: string;
  SettingsAgent: ISettingsAgent;
  DesktopProxy: DesktopProxy;
  TargetCeProxy: ContentEditorProxy
  TargetDoc: IDataOneDoc;
  //TargetSnapShotFlavor: SnapShotFlavor,
  TargetSnapShotId: GuidData;
  ScWinMan: IScWindowManager;
  ScUiMan: ScUiManager;
  ToastAgent: IToastAgent;
  AtticAgent: IContentAtticAgent;
  Logger: ILoggerAgent;
  ContentMessageBroker: ContentMessageBroker,
  TopLevelDoc(): IDataOneDoc,
  AutoSnapShotAgent: AutoSnapShotAgent
}