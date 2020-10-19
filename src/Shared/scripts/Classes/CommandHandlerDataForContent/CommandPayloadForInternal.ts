import { AutoSnapShotAgent } from "../../../../Content-Top/scripts/Agents/AutoSnapShotAgent";
import { BrowserMessageBroker_Content } from "../../../../Content-Top/scripts/Proxies/BrowserMessageBroker_Content";
import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { GuidData } from "../../Helpers/GuidData";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IHindSiteScUiAPI } from "../../Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";
import { IApiCallPayload } from "../../Interfaces/IApiCallPayload";
import { ICommandParams } from "../../Interfaces/ICommandParams";
import { _CommonBase } from "../../_CommonCoreBase";

export class CommandPayloadForInternal extends _CommonBase implements ICommandParams {
  NewNickname: string;
  TargetSnapShotId: GuidData;
  AtticAgent: IContentAtticAgent;
  ContentMessageBroker: BrowserMessageBroker_Content = null;
  hindeCore: ICommonCore = null;
  TargetDoc: DocumentJacket = null;
  TargetNickName: string = '';
  ToastAgent: IToastAgent = null;
  TopLevelDoc: DocumentJacket = null;
  SettingsAgent: ISettingsAgent;
  AutoSnapShotAgent: AutoSnapShotAgent;
  ApiPayload: IApiCallPayload;
  ScUiProxy: IHindSiteScUiAPI;

  constructor(hindeCore: ICommonCore, atticAgent: IContentAtticAgent, toastAgent: IToastAgent,  settingsAgent: ISettingsAgent, autoSnapShotAgent: AutoSnapShotAgent, apiPayload: IApiCallPayload) {
    super(hindeCore);
    this.AtticAgent = atticAgent;
    this.ToastAgent = toastAgent;
    this.SettingsAgent = settingsAgent;
    this.AutoSnapShotAgent = autoSnapShotAgent;
    this.ApiPayload = apiPayload;
  }
}