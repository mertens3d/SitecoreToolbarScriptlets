import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { LoggableBase } from "../Managers/LoggableBase";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { FactoryHelper } from "../../../Shared/scripts/Helpers/FactoryHelper";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { FrameProxy } from "../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy";

export class FrameHelper extends LoggableBase {

  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  async GetLiveFrames(targetDoc: IDataOneDoc): Promise<FrameProxy[]> {
    this.Logger.FuncStart(this.GetLiveFrames.name);

    var toReturn: FrameProxy[] = [];

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

        await factoryHelper.FrameProxyForPromiseFactory(iframeElem, 'desktop Iframe_' + ifrIdx)
          .then((result) => toReturn.push(result));
      }

      //this.Logger.LogAsJsonPretty('toReturn', toReturn);
      this.Logger.LogVal('GetAllLiveIframeData: iframe count', toReturn.length);

      this.Logger.FuncEnd(this.GetLiveFrames.name);

      return toReturn;
    }
  }
}