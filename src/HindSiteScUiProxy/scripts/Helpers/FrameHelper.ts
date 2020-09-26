import { RecipeBasics } from "../../../Shared/scripts/Classes/RecipeBasics";
import { FactoryHelper } from "../../../Shared/scripts/Helpers/FactoryHelper";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { _BaseFrameProxy } from "../Proxies/Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";
import { DTFrameProxy } from "../Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";

export class FrameHelper extends LoggableBase {
  private factoryHelper: FactoryHelper;
  private RecipeBasics: RecipeBasics;

  constructor(logger: ILoggerAgent) {
    super(logger);
    this.RecipeBasics = new RecipeBasics(this.Logger);
    this.factoryHelper = new FactoryHelper(this.Logger);
  }

  GetIFramesFromDataOneDoc(targetDoc: IDataOneDoc): HTMLIFrameElement[] {
    let toReturnIframeAr: HTMLIFrameElement[] = [];

    if (! this.Logger.IfNullOrUndefinedThrow(this.GetIFramesFromDataOneDoc.name, targetDoc)) {
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
    } else {
      this.Logger.ErrorAndThrow(this.GetIFramesFromDataOneDoc.name, 'null check');
    }
    this.Logger.LogVal('found iframes count', toReturnIframeAr.length);

    return toReturnIframeAr;
  }

  async GetIFrameAsBaseFrameProxy(iframeElem: HTMLIFrameElement, ifrIdx: number): Promise<_BaseFrameProxy> {
    return new Promise(async (resolve, reject) => {
      await this.RecipeBasics.WaitForReadyNABHtmlIframeElement(iframeElem)
        .then(() => this.factoryHelper.BaseFramePromiseFactory(iframeElem, 'desktop Iframe_' + ifrIdx))
        .then((result: _BaseFrameProxy) => resolve(result))
        .catch((err) => reject(this.GetIFramesAsBaseFrameProxies.name + ' | ' + err));
    });
  }

  async GetIFrameAsDTFrameProxy(iframeElem: HTMLIFrameElement): Promise<DTFrameProxy> {
    return new Promise(async (resolve, reject) => {
      await this.RecipeBasics.WaitForReadyNABHtmlIframeElement(iframeElem)
        .then(() => this.factoryHelper.DTFrameProxyFactory(iframeElem))
        .then((result: DTFrameProxy) => resolve(result))
        .catch((err) => reject(this.GetIFramesAsBaseFrameProxies.name + ' | ' + err));
    });
  }

  async GetIFramesAsDTFrameProxies(dataOneDoc: IDataOneDoc): Promise<DTFrameProxy[]> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetIFramesAsBaseFrameProxies.name);

      var toReturn: DTFrameProxy[] = [];
      let iframeAr: HTMLIFrameElement[] = this.GetIFramesFromDataOneDoc(dataOneDoc);

      let promiseAr: Promise<DTFrameProxy>[] = [];

      iframeAr.forEach((iframeElem) => {
        promiseAr.push(this.GetIFrameAsDTFrameProxy(iframeElem));
      });

      Promise.all(promiseAr)
        .then((values: DTFrameProxy[]) => {
          values.forEach((oneVal: DTFrameProxy) => {
            toReturn.push(oneVal);
          });
          this.Logger.LogVal('count: ', toReturn.length);
        })
        .then(() => resolve(toReturn))
        .catch((err) => reject(this.GetIFramesAsBaseFrameProxies.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetIFramesAsBaseFrameProxies.name);
    });
  }

  async GetIFramesAsBaseFrameProxies(targetDoc: IDataOneDoc): Promise<_BaseFrameProxy[]> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetIFramesAsBaseFrameProxies.name);

      var toReturn: _BaseFrameProxy[] = [];
      let iframeAr = this.GetIFramesFromDataOneDoc(targetDoc);

      //if (iframeAr) {
      //  iframeAr.forEach(async (iframeElem: HTMLIFrameElement, ifrIdx) => {
      //    await this.RecipeBasics.WaitForPageReadyHtmlIframeElement(iframeElem)
      //      .then(() => factoryHelper.FrameProxyForPromiseFactory(iframeElem, 'desktop Iframe_' + ifrIdx))
      //      .then((result: _BaseFrameProxy) => toReturn.push(result))
      //      .catch((err) => reject(this.GetIFramesAsFrameProxies.name + ' | ' + err));
      //  });
      //}

      let promAr: Promise<_BaseFrameProxy>[] = [];

      iframeAr.forEach((iframeElem, index) => {
        promAr.push(this.GetIFrameAsBaseFrameProxy(iframeElem, index));
      });

      Promise.all(promAr)
        .then((values: _BaseFrameProxy[]) => {
          values.forEach((oneVal: _BaseFrameProxy) => {
            toReturn.push(oneVal);
          });
          this.Logger.LogVal('count: ', toReturn.length);
        })
        .then(() => resolve(toReturn))
        .catch((err) => reject(this.GetIFramesAsBaseFrameProxies.name + ' | ' + err));

      this.Logger.FuncEnd(this.GetIFramesAsBaseFrameProxies.name);
    });
  }
}