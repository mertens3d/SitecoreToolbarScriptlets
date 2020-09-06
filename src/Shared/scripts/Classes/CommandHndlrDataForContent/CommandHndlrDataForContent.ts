import { ICommandHndlrDataForContent } from "../../Interfaces/ICommandHndlrDataForContent";
import { DesktopAgent } from "../../../../Content/scripts/Managers/DesktopManager/DesktopManager";
import { OneCEAgent } from "../../../../Content/scripts/Agents/OneCEAgent/OneCEAgent";
import { IDataOneDoc } from "../../Interfaces/Data/IDataOneDoc";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { GuidData } from "../../Helpers/GuidData";
import { IScWindowManager } from "../../Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ScUiManager } from "../../../../Content/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";
import { IContentAtticAgent } from "../../Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { ContentMessageBroker } from "../../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { ScWindowManager } from "../../../../Content/scripts/Managers/ScWindowManager/ScWindowManager";

export class CommandHndlrDataForContent implements ICommandHndlrDataForContent {
  AtticAgent: IContentAtticAgent = null;
  ContentMessageBroker: ContentMessageBroker = null;
  DesktopMan: DesktopAgent = null;
  Logger: ILoggerAgent = null;
  ScUiMan: ScUiManager = null;
  ScWinMan: IScWindowManager = null;
  TargetCeAgent: OneCEAgent = null;
  TargetDoc: IDataOneDoc = null;
  TargetNickName: string = '';
  TargetSnapShotFlavor: SnapShotFlavor = SnapShotFlavor.Unknown;
  TargetSnapShotId: GuidData = null;
  ToastAgent: IToastAgent = null;
  TopLevelDoc = () => this.ScWinMan.GetTopLevelDoc();


  constructor(logger: ILoggerAgent, atticAgent: IContentAtticAgent, scWinMan: IScWindowManager, toastAgent: IToastAgent, scUiMan: ScUiManager) {
    this.Logger = logger;
    this.AtticAgent = atticAgent;
    this.ScWinMan = scWinMan;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
  }
}