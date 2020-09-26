import { ContentMessageBroker } from "../../../../Content/scripts/Proxies/ContentMessageBroker";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { GuidData } from "../../Helpers/GuidData";
import { IContentAtticAgent } from "../../Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../Interfaces/Agents/IScWindowManager/IScWindowManager";
import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";
import { IDataOneDoc } from "../../Interfaces/Data/IDataOneDoc";
import { IApiCommandPayload, InternalCommandPayload } from "../../Interfaces/ICommandHandlerDataForContent";
import { AutoSnapShotAgent } from "../../../../Content/scripts/Agents/AutoSnapShotAgent";
import { DesktopProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { ScUiManager } from "../../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { ContentEditorProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";

export class CommandPayloadForInternal implements InternalCommandPayload {
  NewNickName: string;
  TargetSnapShotId: GuidData;
  AtticAgent: IContentAtticAgent;
  ContentMessageBroker: ContentMessageBroker = null;
  DesktopProxy: DesktopProxy = null;
  Logger: ILoggerAgent = null;
  ScUiMan: ScUiManager = null;
  ScWinMan: IScWindowManager = null;
  TargetCeProxy: ContentEditorProxy;
  TargetDoc: IDataOneDoc = null;
  TargetNickName: string = '';
  ToastAgent: IToastAgent = null;
  TopLevelDoc = () => this.ScWinMan.GetTopLevelDoc();
  SettingsAgent: ISettingsAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
    ApiPayload: IApiCommandPayload;

  constructor(logger: ILoggerAgent, atticAgent: IContentAtticAgent, scWinMan: IScWindowManager, toastAgent: IToastAgent, scUiMan: ScUiManager, settingsAgent: ISettingsAgent, autoSnapShotAgent: AutoSnapShotAgent, apiPayload: IApiCommandPayload) {
    this.Logger = logger;
    this.AtticAgent = atticAgent;
    this.ScWinMan = scWinMan;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.SettingsAgent = settingsAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.ApiPayload = apiPayload;
  }
}

export class CommandHandlerDataForContent implements IApiCommandPayload {
  AtticAgent: IContentAtticAgent = null;
  ContentMessageBroker: ContentMessageBroker = null;
  DesktopProxy: DesktopProxy = null;
  Logger: ILoggerAgent = null;
  ScUiMan: ScUiManager = null;
  ScWinMan: IScWindowManager = null;
  TargetCeProxy: ContentEditorProxy;
  TargetDoc: IDataOneDoc = null;
  TargetNickName: string = '';
  //TargetSnapShotFlavor: SnapShotFlavor = SnapShotFlavor.Unknown;
  TargetSnapShotId: GuidData = null;
  ToastAgent: IToastAgent = null;
  TopLevelDoc = () => this.ScWinMan.GetTopLevelDoc();
  SettingsAgent: ISettingsAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  NewNickName: string;

  constructor(logger: ILoggerAgent, atticAgent: IContentAtticAgent, scWinMan: IScWindowManager, toastAgent: IToastAgent, scUiMan: ScUiManager, settingsAgent: ISettingsAgent, autoSnapShotAgent: AutoSnapShotAgent) {
    this.Logger = logger;
    this.AtticAgent = atticAgent;
    this.ScWinMan = scWinMan;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.SettingsAgent = settingsAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
  }
}