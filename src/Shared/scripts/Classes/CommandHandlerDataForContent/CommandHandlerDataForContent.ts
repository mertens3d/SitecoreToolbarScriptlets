import { AutoSnapShotAgent } from "../../../../Content/scripts/Agents/AutoSnapShotAgent/AutoSnapShotAgent";
import { ContentMessageBroker } from "../../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { ScUiManager } from "../../../../Content/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { GuidData } from "../../Helpers/GuidData";
import { IContentAtticAgent } from "../../Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IContentBrowserProxy } from "../../Interfaces/Agents/IContentBrowserProxy";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";
import { IDataOneDoc } from "../../Interfaces/Data/IDataOneDoc";
import { ICommandHandlerDataForContent } from "../../Interfaces/ICommandHandlerDataForContent";
import { IContentEditorProxy, IDesktopProxy, IDesktopStartBarProxy } from "../../Interfaces/Proxies/IDesktopProxy";

export class CommandHandlerDataForContent implements ICommandHandlerDataForContent {
  AtticAgent: IContentAtticAgent = null;
  ContentMessageBroker: ContentMessageBroker = null;
  DesktopProxy: IDesktopProxy = null;
  Logger: ILoggerAgent = null;
  ScUiMan: ScUiManager = null;
  ScWinMan: IScWindowManager = null;
  TargetCeProxy: IContentEditorProxy;
  TargetDoc: IDataOneDoc = null;
  TargetNickName: string = '';
  //TargetSnapShotFlavor: SnapShotFlavor = SnapShotFlavor.Unknown;
  TargetSnapShotId: GuidData = null;
  ToastAgent: IToastAgent = null;
  TopLevelDoc = () => this.ScWinMan.GetTopLevelDoc();
  SettingsAgent: ISettingsAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  NewNickName: string;
  ContentBrowserProxy: IContentBrowserProxy;
  DesktopStartBarProxy: IDesktopStartBarProxy;

  constructor(logger: ILoggerAgent, atticAgent: IContentAtticAgent, scWinMan: IScWindowManager, toastAgent: IToastAgent, scUiMan: ScUiManager, settingsAgent: ISettingsAgent, autoSnapShotAgent: AutoSnapShotAgent, contentBrowserProxy: IContentBrowserProxy, desktopStartBarProxy: IDesktopStartBarProxy) {
    this.Logger = logger;
    this.AtticAgent = atticAgent;
    this.ScWinMan = scWinMan;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.SettingsAgent = settingsAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.ContentBrowserProxy = contentBrowserProxy;
    this.DesktopStartBarProxy = desktopStartBarProxy;
  }
}