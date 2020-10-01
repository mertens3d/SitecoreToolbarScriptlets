import { FrameHelper } from '../../../HindSiteScUiProxy/scripts/Helpers/FrameHelper';
import { DTFrameProxy } from '../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';
import { _BaseFrameProxy } from '../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy';
import { IterationDrone } from '../Agents/Drones/IterationDrone/IterationDrone';
import { ReadyStateNAB } from '../Enums/ReadyState';
import { FactoryHelper } from '../Helpers/FactoryHelper';
import { ILoggerAgent } from '../Interfaces/Agents/ILoggerAgent';
import { IDataOneDoc } from '../Interfaces/Data/IDataOneDoc';
import { IAbsoluteUrl } from '../Interfaces/IAbsoluteUrl';
import { IRecipeBasics } from '../Interfaces/IPromiseHelper';
import { IScVerSpec } from '../Interfaces/IScVerSpec';
import { LoggableBase } from '../LoggableBase';
import { PromiseResult } from "./PromiseResult";

export class RecipeBasics extends LoggableBase implements IRecipeBasics {
  constructor(logger: ILoggerAgent) {
    super(logger);
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

  async WaitForCompleteNABHtmlIframeElement(targetIframe: HTMLIFrameElement, friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABHtmlIframeElement.name, friendly);

      if (targetIframe) {
        var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForCompleteNABHtmlIframeElement.name, false);
        let readyStateNAB: ReadyStateNAB = new ReadyStateNAB(this.Logger, targetIframe.contentDocument);

        while (iterationJr.DecrementAndKeepGoing() && readyStateNAB.DocIsAboutBlank()) {
          await iterationJr.Wait();
          readyStateNAB.SetDocument(targetIframe.contentDocument);
          readyStateNAB.LogDebugValues();
        }

        if (iterationJr.IsExhausted) {
          this.Logger.Log(iterationJr.IsExhaustedMsg);
          resolve(readyStateNAB);
        } else {
          await this.WaitForCompleteNABDocumentNative(targetIframe.contentDocument, friendly)
            .then((result: ReadyStateNAB) => {
              this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, result.DocumentReadtStateFriendly());
              resolve(result);
            })
            .catch((err) => reject(this.WaitForCompleteNABHtmlIframeElement + ' | ' + err));
        }
      }
      else {
        this.Logger.ErrorAndThrow(this.WaitForCompleteNABHtmlIframeElement.name, 'No target doc: ' + friendly);
      }
      this.Logger.FuncEnd(this.WaitForCompleteNABHtmlIframeElement.name, friendly);;
    });
  }

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
  //    this.Logger.ErrorAndThrow(this.GetReadyStateNAB.name, 'null doc');
  //  }
  //  return toReturn;
  //}

  async WaitForCompleteNABDocumentNative(document: Document, friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABDocumentNative.name, friendly);
      if (document) {
        var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForCompleteNABDocumentNative.name, false);
        let readyStateNAB: ReadyStateNAB = new ReadyStateNAB(this.Logger, document);

        while (iterationJr.DecrementAndKeepGoing() && !readyStateNAB.IsCompleteNAB()) {
          readyStateNAB.LogDebugValues();
          await iterationJr.Wait();
        }

        if (iterationJr.IsExhausted) {
          this.Logger.Log(iterationJr.IsExhaustedMsg);
          reject(iterationJr.IsExhaustedMsg);
        } else {
          resolve(readyStateNAB);
        }
      }
      else {
        reject(this.WaitForCompleteNABDocumentNative.name + ' |  ' + 'No target doc');
      }
      this.Logger.FuncEnd(this.WaitForCompleteNABDocumentNative.name, friendly);
    });
  }

  WaitForNoUiFrontOverlay(friendly: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNoUiFrontOverlay.name, friendly);
      var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForNoUiFrontOverlay.name, true);

      let overLayExists: boolean = true;

      let iframeElem: HTMLIFrameElement = <HTMLIFrameElement> document.getElementById('jqueryModalDialogsFrame');
      let iframeContentDoc: Document = iframeElem.contentDocument;
      let iframeContentDocBody: HTMLBodyElement = <HTMLBodyElement> iframeContentDoc.body;

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

  WaitForTimePeriod(timeToWaitMs: number, friendly: string): any {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForTimePeriod.name, friendly);
      var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForTimePeriod.name, true);

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

  async WaitForCompleteNABDataOneDoc(targetDoc: IDataOneDoc, friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABDataOneDoc.name, friendly);

      if (targetDoc) {
        await this.WaitForCompleteNABDocumentNative(targetDoc.ContentDoc, friendly)
          .then((result: ReadyStateNAB) => {
            result.LogDebugValues();
            resolve(result);
          })
          .catch((err) => reject(this.WaitForCompleteNABDataOneDoc.name + ' | ' + err));
      }
      else {
        reject(this.WaitForCompleteNABDataOneDoc.name + ' No target doc');
      }

      this.Logger.FuncEnd(this.WaitForCompleteNABDataOneDoc.name, friendly);
    });
  }

  async GetTopLevelIframe(targetDoc: IDataOneDoc): Promise<_BaseFrameProxy> {
    var toReturn: _BaseFrameProxy = null;
    let frameHelper = new FrameHelper(this.Logger);
    await frameHelper.GetIFramesAsBaseFrameProxies(targetDoc)
      .then((allIframe: _BaseFrameProxy[]) => {
        var maxZVal = -1;
        if (allIframe && allIframe.length > 0) {
          for (var idx = 0; idx < allIframe.length; idx++) {
            var candidateIframe = allIframe[idx];
            if (candidateIframe && candidateIframe.GetZindexAsInt() > maxZVal) {
              toReturn = candidateIframe;
              maxZVal = candidateIframe.GetZindexAsInt();
            }
          }
        }
      })
    return toReturn;
  }

  async WaitForIframeElemAndReturnWhenReady(haystackDoc: IDataOneDoc, selector: string, iframeNickName: string): Promise<_BaseFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForIframeElemAndReturnWhenReady.name);

      let factoryHelp = new FactoryHelper(this.Logger);

      await this.WaitForAndReturnFoundElem(haystackDoc, selector)
        .then(async (foundElem: HTMLIFrameElement) => await factoryHelp.BaseFramePromiseFactory(<HTMLIFrameElement>foundElem, iframeNickName))
        .then((result) => resolve(result))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.WaitForIframeElemAndReturnWhenReady.name);
    });
  }
  async WaitForNewIframeContentEditor(allIframesBefore: HTMLIFrameElement[], targetDoc: IDataOneDoc): Promise<DTFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNewIframe.name);
      let toReturn: DTFrameProxy = null;

      await this.WaitForNewIframeNative(allIframesBefore, targetDoc)
        .then((result: HTMLIFrameElement) => {
          toReturn = new DTFrameProxy(this.Logger, result);
        })
        .then(() => resolve(toReturn))
        .catch((err) => reject(this.WaitForNewIframeContentEditor.name + ' | ' + err));

      this.Logger.FuncEnd(this.WaitForNewIframe.name);
    });
  }

  async WaitForNewIframeNative(allIframesBefore: HTMLIFrameElement[], dateOneDoc: IDataOneDoc): Promise<HTMLIFrameElement> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNewIframeNative.name);
      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, [allIframesBefore, dateOneDoc]);

      var toReturn: HTMLIFrameElement = null;

      var iterationJr = new IterationDrone(this.Logger, this.WaitForNewIframeNative.name, true)
      let beforeCount: number = allIframesBefore.length;

      while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
        var allIframesAfter: HTMLIFrameElement[];

        let frameHelper = new FrameHelper(this.Logger);

        allIframesAfter = frameHelper.GetIFramesFromDataOneDoc(dateOneDoc);

        var count: number = allIframesAfter.length;

        if (count > beforeCount) {
          var newIframes: HTMLIFrameElement[] = allIframesAfter.filter(e => !allIframesBefore.includes(e));

          toReturn = newIframes[0];
          resolve(toReturn);
        } else {
          await iterationJr.Wait();
        }
      }

      reject('probably ' + iterationJr.IsExhaustedMsg);

      this.Logger.FuncEnd(this.WaitForNewIframeNative.name);
    });
  }

  async WaitForNewIframe(allIframesBefore: _BaseFrameProxy[], targetDoc: IDataOneDoc): Promise<_BaseFrameProxy> {
    return new Promise<_BaseFrameProxy>(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNewIframe.name);
      this.Logger.LogAsJsonPretty('allIframesBefore', allIframesBefore);

      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, [allIframesBefore, targetDoc]);

      var toReturn: _BaseFrameProxy = null;

      var iterationJr = new IterationDrone(this.Logger, this.WaitForNewIframe.name, true)
      let beforeCount: number = allIframesBefore.length;

      while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
        var allIframesAfter: _BaseFrameProxy[];

        let frameHelper = new FrameHelper(this.Logger);

        await frameHelper.GetIFramesAsBaseFrameProxies(targetDoc)
          .then((result) => allIframesAfter = result)
          .catch((err) => reject(this.WaitForNewIframe.name + ' ' + err));

        var count: number = allIframesAfter.length;
        this.Logger.Log('iFrame count before: ' + beforeCount);
        this.Logger.Log('iFrame count after: ' + allIframesAfter.length);

        if (count > beforeCount) {
          var newIframes: _BaseFrameProxy[] = allIframesAfter.filter(e => !allIframesBefore.includes(e));

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

      this.Logger.ThrowIfNullOrUndefined(this.WaitForElemToHaveClassOrReject.name, [htmlElement, classNames]);

      this.Logger.LogAsJsonPretty('classNames', classNames);

      var elemHasClassName: boolean = false;

      var iterationJr = new IterationDrone(this.Logger, this.WaitForElemToHaveClassOrReject.name + ' : ' + classNames + ' ' + friendly, true);

      while (!elemHasClassName && iterationJr.DecrementAndKeepGoing()) {
        let classList = htmlElement.classList;

        classNames.forEach((className: string) => {
          if (classList.contains(className)) {
            elemHasClassName = true;
          }
        })

        this.Logger.LogAsJsonPretty('classList', classList);
        if (elemHasClassName) {
          this.Logger.Log('has it');
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
      this.Logger.ThrowIfNullOrUndefined(this.WaitAndReturnFoundFromContainer.name, [haystackElem, selector]);
      var toReturnFoundElem: HTMLElement = null;
      var iterationJr = new IterationDrone(this.Logger, this.WaitAndReturnFoundFromContainer.name + ' : ' + selector + ' ' + friendly, true);

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

  async WaitForAndReturnFoundElem(haystackDoc: IDataOneDoc, selector: string, overrideIterCount = 8): Promise<HTMLElement> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForAndReturnFoundElem.name);

      var toReturnFoundElem: HTMLElement = null;
      var iterationJr = new IterationDrone(this.Logger, this.WaitForAndReturnFoundElem.name + ' - ' + selector + ' - ' + haystackDoc.Nickname, true, overrideIterCount);

      while (!toReturnFoundElem && iterationJr.DecrementAndKeepGoing()) {
        toReturnFoundElem = haystackDoc.ContentDoc.querySelector(selector);
        if (toReturnFoundElem) {
          resolve(toReturnFoundElem)
        } else {
          await iterationJr.Wait();
        }
      }

      reject(iterationJr.IsExhaustedMsg);
      this.Logger.FuncEnd(this.WaitForAndReturnFoundElem.name);
    });
  }

  WaitForAndClickWithPayload(selector: string, targetDoc: IDataOneDoc, payload: any) {
    return new Promise<any>(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForAndClickWithPayload.name, selector);

      await this.WaitForThenClick([selector], targetDoc)
        .then(() => resolve(payload))
        .catch(ex => {
          this.Logger.ErrorAndThrow(this.WaitForAndClickWithPayload.name, ex);
          reject(ex);
        });
    });
  }

  TabWaitForReadyStateCompleteNative(browserTab: browser.tabs.Tab): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let iterHelper = new IterationDrone(this.Logger, this.TabWaitForReadyStateCompleteNative.name, true);

      let result: PromiseResult = new PromiseResult(this.TabWaitForReadyStateCompleteNative.name, this.Logger);

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

  async RaceWaitAndClick(selector: IScVerSpec, targetDoc: IDataOneDoc): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.WaitForThenClick([selector.sc920, selector.sc820], targetDoc)
        .then(() => resolve())
        .catch((err) => reject(this.RaceWaitAndClick.name + ' | ' + err));
    });
  }

  WaitForThenClick(selectorAr: string[], targetDoc: IDataOneDoc): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.ThrowIfNullOrUndefined(this.WaitForThenClick.name, [selectorAr, targetDoc]);

      var found: HTMLElement = null;
      var iterationJr = new IterationDrone(this.Logger, this.WaitForThenClick.name, true);

      while (!found && iterationJr.DecrementAndKeepGoing()) {// todo put back && !this.MsgMan().OperationCancelled) {
        for (var idx = 0; idx < selectorAr.length; idx++) {
          found = targetDoc.ContentDoc.querySelector(selectorAr[idx]);
          if (found) {
            break;
          }
        }
      }

      if (found) {
        try {
          this.Logger.LogAsJsonPretty(this.WaitForThenClick.name + ' clicking', selectorAr);
          found.click();
          resolve();
        } catch (err) {
          reject(this.WaitForThenClick.name + ' | ' + err);
        }
      } else {
        await iterationJr.Wait()
          .catch((err) => reject(this.WaitForThenClick.name + ' | ' + err));
      }

      if (!found && iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
      }
    });
  }
}