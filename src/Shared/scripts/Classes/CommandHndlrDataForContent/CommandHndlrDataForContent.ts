import { ContentEditorAgent } from "../../../../Content/scripts/Agents/ContentEditorAgent/ContentEditorAgent";
import { ContentMessageBroker } from "../../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { ScUiManager } from "../../../../Content/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { DesktopProxy } from "../../../../Content/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { GuidData } from "../../Helpers/GuidData";
import { IContentAtticAgent } from "../../Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";
import { IDataOneDoc } from "../../Interfaces/Data/IDataOneDoc";
import { ICommandHndlrDataForContent } from "../../Interfaces/ICommandHndlrDataForContent";

export class CommandHndlrDataForContent implements ICommandHndlrDataForContent {
  AtticAgent: IContentAtticAgent = null;
  ContentMessageBroker: ContentMessageBroker = null;
  DesktopMan: DesktopProxy = null;
  Logger: ILoggerAgent = null;
  ScUiMan: ScUiManager = null;
  ScWinMan: IScWindowManager = null;
  TargetCeAgent: ContentEditorAgent;
  TargetDoc: IDataOneDoc = null;
  TargetNickName: string = '';
  TargetSnapShotFlavor: SnapShotFlavor = SnapShotFlavor.Unknown;
  TargetSnapShotId: GuidData = null;
  ToastAgent: IToastAgent = null;
  TopLevelDoc = () => this.ScWinMan.GetTopLevelDoc();
  SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, atticAgent: IContentAtticAgent, scWinMan: IScWindowManager, toastAgent: IToastAgent, scUiMan: ScUiManager, settingsAgent: ISettingsAgent) {
    this.Logger = logger;
    this.AtticAgent = atticAgent;
    this.ScWinMan = scWinMan;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.SettingsAgent = settingsAgent;
  }
}