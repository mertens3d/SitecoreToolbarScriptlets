import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { LoggableBase } from "../Managers/LoggableBase";
import { IframeProxy } from "../../../Shared/scripts/Interfaces/Data/IDataOneIframe";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { FactoryHelper } from "../../../Shared/scripts/Helpers/FactoryHelper";

export class IframeHelper extends LoggableBase {
  GetHostedIframes(targetDoc: IDataOneDoc): IframeProxy[] {
    this.Logger.FuncStart(this.GetHostedIframes.name);

    var toReturn: IframeProxy[] = [];

    var iframeAr = targetDoc.ContentDoc.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc920);

    if (!iframeAr) {
      iframeAr = targetDoc.ContentDoc.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc820);
    }

    this.Logger.LogVal('found iframes count', iframeAr.length);
    if (iframeAr) {
      for (var ifrIdx = 0; ifrIdx < iframeAr.length; ifrIdx++) {
        this.Logger.Log('pushing idx: ' + ifrIdx);

        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>iframeAr[ifrIdx];
        let factoryHelper = new FactoryHelper(this.Logger);
        var dataOneIframe: IframeProxy = factoryHelper.DataOneIframeFactory(iframeElem, 'desktop Iframe_' + ifrIdx);
        toReturn.push(dataOneIframe);
      }

      //this.Logger.LogAsJsonPretty('toReturn', toReturn);
      this.Logger.LogVal('GetAllLiveIframeData: iframe count', toReturn.length);

      this.Logger.FuncEnd(this.GetHostedIframes.name);

      return toReturn;
    }
  }
}