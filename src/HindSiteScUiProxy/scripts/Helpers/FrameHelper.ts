import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { ElementFrameJacket } from "../../../DOMJacket/ElementFrameJacket";
import { IAPICore } from "../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _APICoreBase } from "../../../Shared/scripts/_APICoreBase";
import { DTFrameProxy } from "../Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";

export class FrameHelper extends _APICoreBase {

  constructor(apiCore: IAPICore) {
    super(apiCore);
  }

  async GetIFrameAsBaseFrameProxy(nativeIframeProxy: ElementFrameJacket, ifrIdx: number): Promise<DTFrameProxy> {
    return new Promise(async (resolve, reject) => {
      let friendly = 'desktop Iframe_' + ifrIdx;

      let dTFrameProxy = new DTFrameProxy(this.ApiCore, nativeIframeProxy);
      dTFrameProxy.InstantiateAsyncMembers();
      dTFrameProxy.WireEvents();

      await dTFrameProxy.WaitForCompleteNABFrameProxyOrReject()
        .then(() => resolve(dTFrameProxy))
        //.then((result: ReadyStateNAB) => {
        //  if (!result.IsCompleteNAB()) {
        //    reject(result.DocumentReadtStateFriendly())
        //  }
        //})
        //.then(() => this.factoryHelper.BaseFramePromiseFactory(nativeIframeProxy, friendly))
        //.then((result: DTFrameProxy) => resolve(result))
        .catch((err) => reject(this.GetIFramesAsBaseFrameProxies.name + ' | ' + err));
    });
  }

  async GetIFrameAsDTFrameProxy(frameJacket: ElementFrameJacket): Promise<DTFrameProxy> {
    return new Promise(async (resolve, reject) => {
      let dTFrameProxy = new DTFrameProxy(this.ApiCore, frameJacket);

      await dTFrameProxy.WaitForCompleteNABFrameProxyOrReject()

      await dTFrameProxy.WaitForCompleteNABFrameProxyOrReject()
        //  .then(() => this.factoryHelper.DTFrameProxyFactory(iframeElem))
        .then(() => resolve(dTFrameProxy))
        .catch((err) => reject(this.GetIFramesAsBaseFrameProxies.name + ' | ' + err));
    });
  }

  async GetIFramesAsDTFrameProxies(documentJacket: DocumentJacket): Promise<DTFrameProxy[]> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetIFramesAsBaseFrameProxies.name);

      var toReturn: DTFrameProxy[] = [];
      let frameJackets: ElementFrameJacket[] = documentJacket.GetHostedFrameJackets();

      let promiseAr: Promise<DTFrameProxy>[] = [];

      frameJackets.forEach((iframeElem) => {
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

  async GetIFramesAsBaseFrameProxies(targetDocumentJacket: DocumentJacket): Promise<DTFrameProxy[]> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart(this.GetIFramesAsBaseFrameProxies.name);

      var toReturn: DTFrameProxy[] = [];
      let NativeScIframeProxyAr: ElementFrameJacket[] = targetDocumentJacket.GetHostedFrameJackets();

      //if (iframeAr) {
      //  iframeAr.forEach(async (iframeElem: HTMLIFrameElement, ifrIdx) => {
      //    await this.RecipeBasics.WaitForPageReadyHtmlIframeElement(iframeElem)
      //      .then(() => factoryHelper.FrameProxyForPromiseFactory(iframeElem, 'desktop Iframe_' + ifrIdx))
      //      .then((result: _BaseFrameProxy) => toReturn.push(result))
      //      .catch((err) => reject(this.GetIFramesAsFrameProxies.name + ' | ' + err));
      //  });
      //}

      let promAr: Promise<DTFrameProxy>[] = [];

      NativeScIframeProxyAr.forEach((nativeScIframeProxy: ElementFrameJacket, index) => {
        promAr.push(this.GetIFrameAsBaseFrameProxy(nativeScIframeProxy, index));
      });

      Promise.all(promAr)
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
}