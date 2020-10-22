import { AutoSnapShotAgent } from "../../../../ContentTop/scripts/Agents/AutoSnapShotAgent";
import { BrowserMessageBroker_Content } from "../../../../ContentTop/scripts/Proxies/BrowserMessageBroker_Content";
import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { GuidData } from "../../Helpers/GuidData";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IContentAtticAgent } from "../../Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";
import { IApiCallPayload } from "../../Interfaces/IApiCallPayload";
import { ICommandParams } from "../../Interfaces/ICommandParams";
import { _CommonBase } from "../../_CommonCoreBase";

export class CommandPayloadForInternal extends _CommonBase implements ICommandParams {
  NewNickname: string;
  TargetSnapShotId: GuidData;
  ContentMessageBroker: BrowserMessageBroker_Content = null;
  hindeCore: ICommonCore = null;
  TargetDoc: DocumentJacket = null;
  TargetNickName: string = '';
  TopLevelDoc: DocumentJacket = null;
  ApiPayload: IApiCallPayload;

  constructor(hindeCore: ICommonCore,    apiPayload: IApiCallPayload) {
    super(hindeCore);
    this.ApiPayload = apiPayload;
  }
}