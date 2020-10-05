import { FrameHelper } from '../../../HindSiteScUiProxy/scripts/Helpers/FrameHelper';
import { DTFrameProxy } from '../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';
import { ScDocumentFacade } from "../../../HindSiteScUiProxy/scripts/Proxies/ScDocumentFacade";
import { IterationDrone } from '../Agents/Drones/IterationDrone/IterationDrone';
import { ReadyStateNAB } from '../Enums/ReadyState';
import { IHindeCore } from "../Interfaces/Agents/IHindeCore";
import { IAbsoluteUrl } from '../Interfaces/IAbsoluteUrl';
import { IRecipeBasics } from '../Interfaces/IPromiseHelper';
import { _HindeCoreBase } from '../LoggableBase';
import { PromiseResult } from "./PromiseResult";

export class RecipeBasics extends _HindeCoreBase implements IRecipeBasics {
  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }

  //async WaitForReadyNABFrameProxy(baseframeProxy: _BaseFrameProxy): Promise<_BaseFrameProxy> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.WaitForReadyNABFrameProxy.name, Guid.AsShort(baseframeProxy.Id));
  //    await this.WaitForReadyNABHtmlIframeElement(baseframeProxy.HTMLIframeElement)
  //      .then(() => resolve(baseframeProxy))
  //      .catch((err) => reject(this.WaitForReadyNABFrameProxy.name + ' | ' + err));

  //    this.Logger.FuncEnd(this.WaitForReadyNABFrameProxy.name, Guid.AsShort(baseframeProxy.Id));
  //  });
  //}

  //public GetReadyStateNAB(document: Document): ReadyStateNAB {
  //  // Ready and not About:Blank
  //  let toReturn: ReadyStateNAB = new ReadyStateNAB()
  //  if (document) {
  //    let currentReadyState = document.readyState.toString();
  //    toReturn.DocUrl = document.URL;

  //    if (currentReadyState === 'complete') {
  //      toReturn.EnumReadyState = DocumentReadyState.Complete;
  //      if (toReturn.DocIsAboutBlank !== SharedConst.Const.UrlSuffix.AboutBlank && url != '') {
  //        toReturn = DocumentReadyState.CompleteNAB;
  //      } else {
  //        toReturn = DocumentReadyState.Complete;
  //      }
  //    }
  //  } else {
  //    this.ErrorHand.ErrorAndThrow(this.GetReadyStateNAB.name, 'null doc');
  //  }
  //  return toReturn;
  //}

  WaitForNoUiFrontOverlay(friendly: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNoUiFrontOverlay.name, friendly);
      var iterationJr: IterationDrone = new IterationDrone(this.HindeCore, this.WaitForNoUiFrontOverlay.name, true);

      let overLayExists: boolean = true;

      let iframeElem: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById('jqueryModalDialogsFrame');
      let iframeContentDoc: Document = iframeElem.contentDocument;
      let iframeContentDocBody: HTMLBodyElement = <HTMLBodyElement>iframeContentDoc.body;

      while (iterationJr.DecrementAndKeepGoing() && overLayExists) {
        await iterationJr.Wait();

        let foundElem: HTMLElement = iframeContentDocBody.querySelector(':scope > .ui-widget-overlay.ui-front');
        overLayExists = foundElem !== null;
      }

      if (iterationJr.IsExhausted) {
        this.Logger.Log(iterationJr.IsExhaustedMsg);
        reject(iterationJr.IsExhaustedMsg);
      } else {
        resolve();
      }
      this.Logger.FuncEnd(this.WaitForNoUiFrontOverlay.name, friendly);
    });
  }

  WaitForTimePeriod(timeToWaitMs: number, friendly: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForTimePeriod.name, friendly);
      var iterationJr: IterationDrone = new IterationDrone(this.HindeCore, this.WaitForTimePeriod.name, true);

      let startTimeStamp: number = new Date().getTime();
      let timeElapsed: number = 0;

      while (iterationJr.DecrementAndKeepGoing() && timeElapsed < timeToWaitMs) {
        timeElapsed = new Date().getTime() - startTimeStamp;
        await iterationJr.Wait();
      }

      if (iterationJr.IsExhausted) {
        this.Logger.Log(iterationJr.IsExhaustedMsg);
        reject(iterationJr.IsExhaustedMsg);
      } else {
        resolve();
      }
      this.Logger.FuncEnd(this.WaitForTimePeriod.name, friendly);
    });
  }

  async WaitForCompleteNAB_DataOneDoc(scDocumentProxy: ScDocumentFacade, friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNAB_DataOneDoc.name, friendly);

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForCompleteNAB_DataOneDoc.name,[scDocumentProxy, friendly]);

      await scDocumentProxy.WaitForCompleteNAB_ScDocumentProxy(friendly)// this.WaitForCompleteNABDocumentNative(targetDoc.ContentDoc, friendly)
        .then((result: ReadyStateNAB) => {
          result.LogDebugValues();
          resolve(result);
        })
        .catch((err) => reject(this.WaitForCompleteNAB_DataOneDoc.name + ' | ' + err));

      this.Logger.FuncEnd(this.WaitForCompleteNAB_DataOneDoc.name, friendly);
    });
  }

  async GetTopLevelIframe(targetDoc: ScDocumentFacade): Promise<DTFrameProxy> {
    var toReturn: DTFrameProxy = null;
    let frameHelper = new FrameHelper(this.HindeCore);
    await frameHelper.GetIFramesAsBaseFrameProxies(targetDoc)
      .then((allIframe: DTFrameProxy[]) => {
        var maxZVal = -1;
        if (allIframe && allIframe.length > 0) {
          for (var idx = 0; idx < allIframe.length; idx++) {
            var candidateIframe: DTFrameProxy = allIframe[idx];
            if (candidateIframe && candidateIframe.GetZindexAsInt() > maxZVal) {
              toReturn = candidateIframe;
              maxZVal = candidateIframe.GetZindexAsInt();
            }
          }
        }
      })
    return toReturn;
  }


  //async WaitForNewIframeContentEditor(allIframesBefore: HTMLIFrameElement[], targetDoc: ScDocumentProxy): Promise<DTFrameProxy> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.WaitForNewIframe.name);
  //    let toReturn: DTFrameProxy = null;

  //    await this.WaitForNewIframeNative(allIframesBefore, targetDoc)
  //      .then((result: HTMLIFrameElement) => {
  //        toReturn = new DTFrameProxy(this.HindeCore, result);
  //      })
  //      .then(() => resolve(toReturn))
  //      .catch((err) => reject(this.WaitForNewIframeContentEditor.name + ' | ' + err));

  //    this.Logger.FuncEnd(this.WaitForNewIframe.name);
  //  });
  //}

  //async WaitForNewIframeNative(allIframesBefore: HTMLIFrameElement[], dateOneDoc: ScDocumentProxy): Promise<HTMLIFrameElement> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.WaitForNewIframeNative.name);
  //    this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, [allIframesBefore, dateOneDoc]);

  //    var toReturn: HTMLIFrameElement = null;

  //    var iterationJr = new IterationDrone(this.HindeCore, this.WaitForNewIframeNative.name, true)
  //    let beforeCount: number = allIframesBefore.length;

  //    while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
  //      var allIframesAfter: NativeScIframeProxy[];

  //      let frameHelper = new FrameHelper(this.HindeCore);

  //      allIframesAfter = dateOneDoc.GetIFramesFromDataOneDoc();

  //      var count: number = allIframesAfter.length;

  //      if (count > beforeCount) {
  //        var newIframes: HTMLIFrameElement[] = allIframesAfter.filter(e => !allIframesBefore.includes(e));

  //        toReturn = newIframes[0];
  //        resolve(toReturn);
  //      } else {
  //        await iterationJr.Wait();
  //      }
  //    }

  //    reject('probably ' + iterationJr.IsExhaustedMsg);

  //    this.Logger.FuncEnd(this.WaitForNewIframeNative.name);
  //  });
  //}

  async WaitForNewIframe(allIframesBefore: DTFrameProxy[], targetDoc: ScDocumentFacade): Promise<DTFrameProxy> {
    return new Promise<DTFrameProxy>(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNewIframe.name);
      this.Logger.LogAsJsonPretty('allIframesBefore', allIframesBefore);

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, [allIframesBefore, targetDoc]);

      var toReturn: DTFrameProxy = null;

      var iterationJr = new IterationDrone(this.HindeCore, this.WaitForNewIframe.name, true)
      let beforeCount: number = allIframesBefore.length;

      while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
        var allIframesAfter: DTFrameProxy[];

        let frameHelper = new FrameHelper(this.HindeCore);

        await frameHelper.GetIFramesAsBaseFrameProxies(targetDoc)
          .then((result) => allIframesAfter = result)
          .catch((err) => reject(this.WaitForNewIframe.name + ' ' + err));

        var count: number = allIframesAfter.length;
        this.Logger.Log('iFrame count before: ' + beforeCount);
        this.Logger.Log('iFrame count after: ' + allIframesAfter.length);

        if (count > beforeCount) {
          var newIframes: DTFrameProxy[] = allIframesAfter.filter(e => !allIframesBefore.includes(e));

          toReturn = newIframes[0];
        } else {
          await iterationJr.Wait();
        }
      }

      this.Logger.FuncEnd(this.WaitForNewIframe.name);
      if (toReturn) {
        resolve(toReturn);
      } else {
        reject(iterationJr.IsExhaustedMsg);
      }
    });
  }

  async WaitForElemToHaveClassOrReject(htmlElement: HTMLElement, classNames: string[], friendly: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForElemToHaveClassOrReject.name, friendly + ' - ' + classNames);

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForElemToHaveClassOrReject.name, [htmlElement, classNames]);
      var elemHasClassName: boolean = false;
      var iterationJr = new IterationDrone(this.HindeCore, this.WaitForElemToHaveClassOrReject.name + ' : ' + classNames + ' ' + friendly, true);

      while (!elemHasClassName && iterationJr.DecrementAndKeepGoing()) {
        let classList = htmlElement.classList;

        classNames.forEach((className: string) => {
          if (classList.contains(className)) {
            elemHasClassName = true;
          }
        })

        if (elemHasClassName) {
          resolve()
        } else {
          await iterationJr.Wait();
        }
      }
      if (iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
      }
      this.Logger.FuncEnd(this.WaitForElemToHaveClassOrReject.name, friendly);
    });
  }

  async WaitAndReturnFoundFromContainer(haystackElem: HTMLElement, selector: string, friendly: string): Promise<HTMLElement> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitAndReturnFoundFromContainer.name, [haystackElem, selector]);
      var toReturnFoundElem: HTMLElement = null;
      var iterationJr = new IterationDrone(this.HindeCore, this.WaitAndReturnFoundFromContainer.name + ' : ' + selector + ' ' + friendly, false);

      while (!toReturnFoundElem && iterationJr.DecrementAndKeepGoing()) {
        toReturnFoundElem = haystackElem.querySelector(selector);
        if (toReturnFoundElem) {
          resolve(toReturnFoundElem)
        } else {
          await iterationJr.Wait();
        }
      }

      if (iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
      }
    });
  }



  TabWaitForReadyStateCompleteNative(browserTab: browser.tabs.Tab): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let iterHelper = new IterationDrone(this.HindeCore, this.TabWaitForReadyStateCompleteNative.name, true);

      let result: PromiseResult = new PromiseResult(this.TabWaitForReadyStateCompleteNative.name, this.HindeCore);

      while (browserTab.status !== 'complete' && iterHelper.DecrementAndKeepGoing()) {
        this.Logger.LogVal('tab status', browserTab.status);
        await iterHelper.Wait;
      }

      if (browserTab.status === 'complete') {
        result.MarkSuccessful();
      } else {
        result.MarkFailed('browser status: ' + browserTab.status)
        if (iterHelper.IsExhausted) {
          result.MarkFailed(iterHelper.IsExhaustedMsg);
        }
      }

      if (result.WasSuccessful()) {
        resolve()
      } else {
        reject(result.RejectReasons);
      }
    });
  }

  TabChainSetHrefWaitForComplete(href: IAbsoluteUrl) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.TabChainSetHrefWaitForComplete.name, href.AbsUrl);

      await browser.tabs.query({ currentWindow: true, active: true })
        .then((result: browser.tabs.Tab[]) => {
          let targetTab: browser.tabs.Tab = result[0];
          browser.tabs.update(targetTab.id, { url: href.AbsUrl });
          this.TabWaitForReadyStateCompleteNative(targetTab);
        })
        .then(resolve)
        .catch((ex) => reject(ex));

      this.Logger.FuncEnd(this.TabChainSetHrefWaitForComplete.name, href.AbsUrl);
    });
  }
}