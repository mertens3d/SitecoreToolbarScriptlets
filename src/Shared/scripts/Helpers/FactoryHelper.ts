﻿import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { IDataOneDoc } from "../Interfaces/IDataOneDoc";
import { IDataOneIframe } from "../Interfaces/IDataOneIframe";
import { IFactoryHelper } from "../Interfaces/IFactoryHelper";
import { Guid } from "./Guid";

export class FactoryHelper extends LoggableBase implements IFactoryHelper {
 
  DataOneContentDocFactoryFromIframe(dataOneIframe: IDataOneIframe): IDataOneDoc {
    var toReturn: IDataOneDoc = null;

    if (dataOneIframe) {
      toReturn =
      {
        ContentDoc: dataOneIframe.IframeElem.contentDocument,
        DocId: Guid.NewRandomGuid(),
        Nickname: dataOneIframe.Nickname + ' - content doc'
      }
    } else {
      this.Logger.ErrorAndThrow(this.DataOneContentDocFactoryFromIframe.name, 'no iframe provided');
    }
    return toReturn;
  }
  DataOneIframeFactory(iframeElem: HTMLIFrameElement, nickname: string): IDataOneIframe {
    this.Logger.FuncStart(this.DataOneIframeFactory.name);
    var toReturn: IDataOneIframe = null;

    if (iframeElem && nickname) {
      let zIndex: number = -1;
      if (iframeElem && iframeElem.style && iframeElem.style.zIndex) {
        zIndex = parseInt(iframeElem.style.zIndex);
      }

      var toReturn: IDataOneIframe = {
        Index: -1,
        IframeElem: iframeElem,
        Id: Guid.NewRandomGuid(),
        Zindex: zIndex,
        Nickname: nickname,
        ContentDoc: null,
      };

      toReturn.ContentDoc = this.DataOneContentDocFactoryFromIframe(toReturn);

      this.Logger.FuncEnd(this.DataOneIframeFactory.name);
    } else {
      this.Logger.ErrorAndThrow(this.DataOneIframeFactory.name, 'one of these is null');
      this.Logger.LogAsJsonPretty('iframeElem', iframeElem);
      this.Logger.LogAsJsonPretty('nickname', nickname);
    }
    return toReturn;
  }
  
}