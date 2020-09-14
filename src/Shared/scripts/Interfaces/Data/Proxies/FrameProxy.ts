import { LoggableBase } from "../../../../../Content/scripts/Managers/LoggableBase";
import { FactoryHelper } from "../../../Helpers/FactoryHelper";
import { Guid } from "../../../Helpers/Guid";
import { GuidData } from "../../../Helpers/GuidData";
import { ILoggerAgent } from "../../Agents/ILoggerAgent";
import { ISettingsAgent } from "../../Agents/ISettingsAgent";
import { IDataOneDoc } from "../IDataOneDoc";
import { FrameProxyMutationEvent_Subject } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/FrameProxyMutationEvent/FrameProxyMutatedEvent_Subject";
import { IContentEditorProxyMutationEvent_Payload } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Payload";
import { IFrameProxyMutationEvent_Payload } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/FrameProxyMutationEvent/IFrameProxyMutationEvent_Payload";
import { IDataStateOfFrame } from "../States/IDataStateOfFrame";

export class FrameProxy extends LoggableBase {
  Index: number = -1;
  IframeElem: HTMLIFrameElement = null;
  Id: GuidData = null;
  Nickname: string = null;
  FrameProxyMutationEvent_Subject: FrameProxyMutationEvent_Subject;


  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement, nickName: string) {
    super(logger);
    this.IframeElem = iframeElem;
    this.Id = Guid.NewRandomGuid();
    this.Nickname = nickName;
  }





  OnContentEditorProxyMutation(payload: IContentEditorProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnContentEditorProxyMutation.name);
    let frameProxyMutationEvent_Payload: IFrameProxyMutationEvent_Payload = {
      ContentEditorProxyMutationPayload: payload,
    }

    this.FrameProxyMutationEvent_Subject.NotifyObservers(frameProxyMutationEvent_Payload);
    this.Logger.FuncEnd(this.OnContentEditorProxyMutation.name);
  }

  GetZindex(): number {
    let toReturn: number = -99;

    if (this.IframeElem && this.IframeElem.style && this.IframeElem.style.zIndex) {
      //toReturn = this.IframeElem.style.zIndex;
      toReturn = parseInt(this.IframeElem.style.zIndex);
    }

    return toReturn;
  }

  GetContentDoc(): IDataOneDoc {
    return new FactoryHelper(this.Logger).DataOneContentDocFactoryFromIframe(this);
  }
}