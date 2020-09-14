import { RecipeBasics } from "../../../Shared/scripts/Classes/RecipeBasics";
import { FactoryHelper } from "../../../Shared/scripts/Helpers/FactoryHelper";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { _BaseFrameProxy } from "../Proxies/_BaseFrameProxy";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { LoggableBase } from "../Managers/LoggableBase";

export class FrameHelper extends LoggableBase {
  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  GetIFramesFromDoc(targetDoc: IDataOneDoc): HTMLIFrameElement[] {
    let toReturnIframeAr: HTMLIFrameElement[] = [];
    var queryResults = targetDoc.ContentDoc.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc920);

    if (!queryResults) {
      queryResults = targetDoc.ContentDoc.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc820);
    }

    if (queryResults) {
      for (var ifrIdx = 0; ifrIdx < queryResults.length; ifrIdx++) {
        var iframeElem: HTMLIFrameElement = <HTMLIFrameElement>queryResults[ifrIdx];
        if (iframeElem) {
          toReturnIframeAr.push(iframeElem);
        }
      }
    }
    this.Logger.LogVal('found iframes count', toReturnIframeAr.length);

    return toReturnIframeAr;
  }

  async GetIFramesAsFrameProxies(targetDoc: IDataOneDoc): Promise<_BaseFrameProxy[]> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetIFramesAsFrameProxies.name);

      var toReturn: _BaseFrameProxy[] = [];
      let iframeAr = this.GetIFramesFromDoc(targetDoc);
      let recipeBasics = new RecipeBasics(this.Logger);

      let factoryHelper = new FactoryHelper(this.Logger);

      if (iframeAr) {
        iframeAr.forEach(async (iframeElem: HTMLIFrameElement, ifrIdx) => {
          await recipeBasics.WaitForPageReadyHtmlIframeElement(iframeElem)
            .then(() => factoryHelper.FrameProxyForPromiseFactory(iframeElem, 'desktop Iframe_' + ifrIdx))
            .then((result) => toReturn.push(result))
            .catch((err) => reject(this.GetIFramesAsFrameProxies.name + ' | ' + err));
        });
      }

      this.Logger.FuncEnd(this.GetIFramesAsFrameProxies.name, 'count: ' + toReturn.length);

      resolve(toReturn);
    });
  }
}