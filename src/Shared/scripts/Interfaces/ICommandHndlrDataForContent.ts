import { ContentMessageBroker } from "../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { ScUiManager } from "../../../Content/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { GuidData } from "../Helpers/GuidData";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "./Agents/ILoggerAgent";
import { IScWindowManager } from "./Agents/IScWindowManager/IScWindowManager";
import { IToastAgent } from "./Agents/IToastAgent";
import { IDataOneDoc } from "./Data/IDataOneDoc";
import { OneCEAgent } from "../../../Content/scripts/Agents/OneCEAgent/OneCEAgent";
import { DesktopAgent } from "../../../Content/scripts/Managers/DesktopManager/DesktopManager";

export interface ICommandHndlrDataForContent {
  DesktopMan: DesktopAgent;
  TargetCeAgent: OneCEAgent;
  TargetDoc: IDataOneDoc;
  TargetSnapShotFlavor: SnapShotFlavor,
  TargetSnapShotId: GuidData;
  ScWinMan: IScWindowManager;
  ScUiMan: ScUiManager;
  ToastAgent: IToastAgent;
  AtticAgent: IContentAtticAgent;
  Logger: ILoggerAgent;
  ContentMessageBroker: ContentMessageBroker,
  TopLevelDoc(): IDataOneDoc,
}