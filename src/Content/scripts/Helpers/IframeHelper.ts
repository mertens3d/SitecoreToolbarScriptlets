import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { LoggableBase } from "../Managers/LoggableBase";
import { FrameProxy } from "../../../Shared/scripts/Interfaces/Data/IDataOneIframe";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { FactoryHelper } from "../../../Shared/scripts/Helpers/FactoryHelper";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";

export class IframeHelper extends LoggableBase {
  SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, settingsAgent: ISettingsAgent) {
    super(logger);
    this.SettingsAgent = settingsAgent;
  }

  async GetHostedIframes(targetDoc: IDataOneDoc): Promise<FrameProxy[]> {
    this.Logger.FuncStart(this.GetHostedIframes.name);

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
        let factoryHelper = new FactoryHelper(this.Logger, this.SettingsAgent);

        await factoryHelper.DataOneIframeFactory(iframeElem, 'desktop Iframe_' + ifrIdx)
          .then((result) => toReturn.push(result));
      }

      //this.Logger.LogAsJsonPretty('toReturn', toReturn);
      this.Logger.LogVal('GetAllLiveIframeData: iframe count', toReturn.length);

      this.Logger.FuncEnd(this.GetHostedIframes.name);

      return toReturn;
    }
  }
}