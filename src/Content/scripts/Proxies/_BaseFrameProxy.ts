import { LoggableBase } from "../Managers/LoggableBase";
import { FrameProxyMutationEvent_Subject } from "./Desktop/DesktopProxy/Events/FrameProxyMutationEvent/FrameProxyMutatedEvent_Subject";
import { FactoryHelper } from "../../../Shared/scripts/Helpers/FactoryHelper";
import { Guid } from "../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/Data/IDataOneDoc";

export class _BaseFrameProxy extends LoggableBase {
  Index: number = -1;
  HTMLIframeElement: HTMLIFrameElement = null;
  Id: GuidData = null;
  FrameProxyMutationEvent_Subject: FrameProxyMutationEvent_Subject;

  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement) {
    super(logger);
    this.HTMLIframeElement = iframeElem;
    this.Id = Guid.NewRandomGuid();
  }

  GetZindex(): number {
    let toReturn: number = -99;

    if (this.HTMLIframeElement && this.HTMLIframeElement.style && this.HTMLIframeElement.style.zIndex) {
      //toReturn = this.IframeElem.style.zIndex;
      toReturn = parseInt(this.HTMLIframeElement.style.zIndex);
    }

    return toReturn;
  }

  GetContentDoc(): IDataOneDoc {
    return new FactoryHelper(this.Logger).DataOneContentDocFactoryFromIframe(this);
  }
}