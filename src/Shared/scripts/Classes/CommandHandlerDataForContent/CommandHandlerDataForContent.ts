import { AutoSnapShotAgent } from "../../../../Content/scripts/Agents/AutoSnapShotAgent";
import { MessageBroker_Content } from "../../../../Content/scripts/Proxies/ContentMessageBroker";
import { ScUiManager } from "../../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { ContentEditorProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { GuidData } from "../../Helpers/GuidData";
import { IHindSiteScUiProxy } from "../../Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";
import { IDataOneDoc } from "../../Interfaces/Data/IDataOneDoc";
import { IApiCallPayload } from "../../Interfaces/ICommandHandlerDataForContent";
import { ICommandParams } from "../../Interfaces/ICommandParams";

export class CommandPayloadForInternal implements ICommandParams {
  NewNickname: string;
  TargetSnapShotId: GuidData;
  AtticAgent: IContentAtticAgent;
  ContentMessageBroker: MessageBroker_Content = null;
  DesktopProxy: DesktopProxy = null;
  Logger: ILoggerAgent = null;
  ScUiMan: ScUiManager = null;
  TargetCeProxy: ContentEditorProxy;
  TargetDoc: IDataOneDoc = null;
  TargetNickName: string = '';
  ToastAgent: IToastAgent = null;
  TopLevelDoc: IDataOneDoc = null;
  SettingsAgent: ISettingsAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  ApiPayload: IApiCallPayload;
  ScUiProxy: IHindSiteScUiProxy;

  constructor(logger: ILoggerAgent, atticAgent: IContentAtticAgent, toastAgent: IToastAgent, scUiMan: ScUiManager, settingsAgent: ISettingsAgent, autoSnapShotAgent: AutoSnapShotAgent, apiPayload: IApiCallPayload) {
    this.Logger = logger;
    this.AtticAgent = atticAgent;
    this.ToastAgent = toastAgent;
    this.ScUiMan = scUiMan;
    this.SettingsAgent = settingsAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.ApiPayload = apiPayload;
  }
}

export class ApiCommandPayload implements IApiCallPayload {

  constructor( ) {
  }
}