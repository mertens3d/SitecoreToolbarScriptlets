import { FrameHelper } from '../../../HindSiteScUiProxy/scripts/Helpers/FrameHelper';
import { DTFrameProxy } from '../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';
import { _BaseFrameProxy } from '../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy';
import { IterationDrone } from '../Agents/Drones/IterationDrone/IterationDrone';
import { FactoryHelper } from '../Helpers/FactoryHelper';
import { Guid } from '../Helpers/Guid';
import { ILoggerAgent } from '../Interfaces/Agents/ILoggerAgent';
import { IDataOneDoc } from '../Interfaces/Data/IDataOneDoc';
import { IAbsoluteUrl } from '../Interfaces/IAbsoluteUrl';
import { IRecipeBasics } from '../Interfaces/IPromiseHelper';
import { IScVerSpec } from '../Interfaces/IScVerSpec';
import { SharedConst } from '../SharedConst';
import { PromiseResult } from "./PromiseResult";
import { LoggableBase } from '../LoggableBase';

export class RecipeBasics extends LoggableBase implements IRecipeBasics {
  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  async WaitForReadyNABFrameProxy(baseframeProxy: _BaseFrameProxy): Promise<_BaseFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForReadyNABFrameProxy.name, Guid.AsShort(baseframeProxy.Id));
      await this.WaitForReadyNABHtmlIframeElement(baseframeProxy.HTMLIframeElement)
        .then(() => resolve(baseframeProxy))
        .catch((err) => reject(this.WaitForReadyNABFrameProxy.name + ' | ' + err));
     
      this.Logger.FuncEnd(this.WaitForReadyNABFrameProxy.name);
    });
  }

  private IsDocumentReadyNAB(document: Document): boolean {
    // Ready and not About:Blank
    let toReturn: boolean = false;
    if (document) {
      let currentReadyState = document.readyState.toString();
      let isReadyStateComplete = currentReadyState === 'complete';
      let url = document.URL;
      if (isReadyStateComplete && url !== SharedConst.Const.UrlSuffix.AboutBlank && url != '') {
        toReturn = true;
      }
    }
    return toReturn;
  }

  async WaitForReadyNABHtmlIframeElement(targetIframe: HTMLIFrameElement): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForReadyNABHtmlIframeElement.name);

      if (targetIframe) {
        var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForReadyNABDocument.name, false);
        var isReady: boolean = false;
        let currentReadyState: string;
        while (iterationJr.DecrementAndKeepGoing() && !isReady) {
          currentReadyState = targetIframe.contentDocument.readyState.toString();
          isReady = this.IsDocumentReadyNAB(targetIframe.contentDocument);
          if (isReady) {
            break;
          } else {
            await iterationJr.Wait();
          }
        }

        if (isReady) {
          resolve();
        }

        if (iterationJr.IsExhausted) {
          reject(iterationJr.IsExhaustedMsg);
        }
      }
      else {
        this.Logger.ErrorAndThrow(this.WaitForReadyNABHtmlIframeElement.name, 'No target doc');
      }
      this.Logger.FuncEnd(this.WaitForReadyNABHtmlIframeElement.name);;
    });
  }

  async WaitForReadyNABDocument(targetDoc: IDataOneDoc) {
    return new Promise(async (resolve, reject) => {
            if (targetDoc) {
        var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForReadyNABDocument.name, false);
        var isReady: boolean = false;
        while (iterationJr.DecrementAndKeepGoing() && !isReady) {
          isReady = this.IsDocumentReadyNAB(targetDoc.ContentDoc);
          if (isReady) {
            break;
          } else {
            await iterationJr.Wait();
          }
        }
        if (isReady) {
          resolve();
        }
        if (iterationJr.IsExhausted) {
          reject(iterationJr.IsExhaustedMsg);
        }
      }
      else {
        this.Logger.ErrorAndThrow(this.WaitForReadyNABDocument.name, 'No target doc');
      }
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
            if (candidateIframe && candidateIframe.GetZindex() > maxZVal) {
              toReturn = candidateIframe;
              maxZVal = candidateIframe.GetZindex();
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
        .then((result: _BaseFrameProxy) => this.WaitForReadyNABFrameProxy(result))
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
      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, allIframesBefore);
      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, dateOneDoc);

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
      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, allIframesBefore);
      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, targetDoc);

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
  async WaitForAndReturnFoundElem(haystackDoc: IDataOneDoc, selector: string, overrideIterCount = 8): Promise<HTMLElement> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForAndReturnFoundElem.name);
      this.Logger.LogVal('selector', selector);
      this.Logger.LogVal('doc nickname', haystackDoc.Nickname);

      var toReturnFoundElem: HTMLElement = null;
      let promiseResult: PromiseResult = new PromiseResult(this.WaitForAndReturnFoundElem.name, this.Logger);

      var iterationJr = new IterationDrone(this.Logger, this.WaitForAndReturnFoundElem.name, true, overrideIterCount);

      while (!toReturnFoundElem && iterationJr.DecrementAndKeepGoing()) {
        toReturnFoundElem = haystackDoc.ContentDoc.querySelector(selector);

        if (toReturnFoundElem) {
          this.Logger.Log('found');

          this.Logger.LogVal('found.style.display', toReturnFoundElem.style.display);

          promiseResult.MarkSuccessful();
        } else {
          await iterationJr.Wait();
        }
      }

      if (!toReturnFoundElem && iterationJr.IsExhausted) {
        promiseResult.MarkFailed(iterationJr.IsExhaustedMsg);
      }
      this.Logger.FuncEnd(this.WaitForAndReturnFoundElem.name);

      if (promiseResult.WasSuccessful()) {
        resolve(toReturnFoundElem);
      } else {
        reject(promiseResult.RejectReasons);
      }
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
      this.Logger.FuncStart(this.RaceWaitAndClick.name);

      await this.WaitForThenClick([selector.sc920, selector.sc820], targetDoc)
        .then(() => {
          this.Logger.FuncEnd(this.RaceWaitAndClick.name);
          resolve();
        })
        .catch((ex) => {
          this.Logger.FuncEnd(this.RaceWaitAndClick.name);
          reject(ex);
        });
    });
  }

  WaitForThenClick(selectorAr: string[], targetDoc: IDataOneDoc): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForThenClick.name);

      if (targetDoc) {
        var found: HTMLElement = null;
        var iterationJr = new IterationDrone(this.Logger, this.WaitForThenClick.name, true);

        while (!found && iterationJr.DecrementAndKeepGoing()) {// todo put back && !this.MsgMan().OperationCancelled) {
          for (var idx = 0; idx < selectorAr.length; idx++) {
            found = targetDoc.ContentDoc.querySelector(selectorAr[idx]);
            if (found) {
              this.Logger.LogVal('found target', selectorAr[idx]);
              break;
            }
          }

          if (found) {
            this.Logger.Log('clicking');
            try {
              found.click();

              resolve();
            } catch (err) {
              reject(err);
            }
          } else {
            await iterationJr.Wait()
          }
        }
      } else {
        reject('no target doc');
      }

      if (!found && iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
      }

      this.Logger.FuncEnd(this.WaitForThenClick.name);
    });
  }
}