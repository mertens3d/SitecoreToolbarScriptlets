import { FrameHelper } from '../../../Content/scripts/Helpers/IframeHelper';
import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { IterationDrone } from '../Agents/Drones/IterationDrone/IterationDrone';
import { FactoryHelper } from '../Helpers/FactoryHelper';
import { Guid } from '../Helpers/Guid';
import { AbsoluteUrl } from '../Interfaces/AbsoluteUrl';
import { ILoggerAgent } from '../Interfaces/Agents/ILoggerAgent';
import { IDataOneDoc } from '../Interfaces/Data/IDataOneDoc';
import { _BaseFrameProxy } from '../../../Content/scripts/Proxies/_BaseFrameProxy';
import { CEFrameProxy } from '../../../Content/scripts/Proxies/CEFrameProxy';
import { IFactoryHelper } from '../Interfaces/IFactoryHelper';
import { IRecipeBasics } from '../Interfaces/IPromiseHelper';
import { IScVerSpec } from '../Interfaces/IScVerSpec';
import { SharedConst } from '../SharedConst';
import { PromiseResult } from "./PromiseResult";

export class RecipeBasics extends LoggableBase implements IRecipeBasics {
  private FactoryHelp: IFactoryHelper;
  private  FrameHelper: FrameHelper;

  constructor(logger: ILoggerAgent) {
    super(logger);
    this.FrameHelper = new FrameHelper(this.Logger);

    this.FactoryHelp = new FactoryHelper(this.Logger);
  }

  async WaitForReadyFrameProxy(baseframeProxy: _BaseFrameProxy): Promise<_BaseFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForReadyFrameProxy.name, Guid.AsShort(baseframeProxy.Id));

      var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForReadyFrameProxy.name);
      let IsReady: boolean = false;

      await this.WaitForPageReadyHtmlIframeElement(baseframeProxy.HTMLIframeElement)
        .then(() => resolve(baseframeProxy))
          .catch((err) => reject(this.WaitForReadyFrameProxy.name + ' | ' + err));

      //while (iterationJr.DecrementAndKeepGoing() && !IsReady) {
      //  var currentReadyState: string = baseframeProxy.HTMLIframeElement.contentDocument.readyState.toString();
      //  var isReadyStateComplete = currentReadyState ===  SharedConst.Const.KeyWords.Javascript.ReadyStates.Complete;
      //  var currentDocUrl = baseframeProxy.HTMLIframeElement.contentDocument.URL;

      //  if (isReadyStateComplete && (currentDocUrl !== SharedConst.Const.UrlSuffix.AboutBlank)) {
      //    this.Logger.LogVal('currentDocUrl', currentDocUrl);
      //    IsReady = true;
      //  } else {
      //    await iterationJr.Wait();
      //  }
      //}

      //if (IsReady) {
      //  this.Logger.Log(baseframeProxy.GetContentDoc().ContentDoc.URL);
      //  resolve(baseframeProxy);
      //}

      //if (iterationJr.IsExhausted) {
      //  reject(iterationJr.IsExhaustedMsg);
      //}

      this.Logger.FuncEnd(this.WaitForReadyFrameProxy.name);
    });
  }

  private IsDocumentReady(document: Document): boolean {
    let toReturn: boolean = false;

    if (document) {
      let currentReadyState = document.readyState.toString();
      let isReadyStateComplete = currentReadyState === 'complete';

      let url = document.URL;

      if (isReadyStateComplete && url !== SharedConst.Const.UrlSuffix.AboutBlank && url != '') {
        toReturn = true;
      }

      this.Logger.LogVal('url', url);;
      this.Logger.LogVal('readyState', currentReadyState);;
      this.Logger.LogVal('isReadyStateComplete', isReadyStateComplete);
      this.Logger.LogVal('toReturn', toReturn);
    }

    return toReturn;
  }

  async WaitForPageReadyHtmlIframeElement(targetIframe: HTMLIFrameElement) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForPageReadyHtmlIframeElement.name);

      if (targetIframe) {
        var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForPageReadyNative.name);

        var isReady: boolean = false;

        let currentReadyState: string;

        while (iterationJr.DecrementAndKeepGoing() && !isReady) {
          currentReadyState = targetIframe.contentDocument.readyState.toString();

          isReady = this.IsDocumentReady(targetIframe.contentDocument);

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
        this.Logger.Log('ready state: ' + currentReadyState + ' is ready: ' + isReady.toString());
      }
      else {
        this.Logger.ErrorAndThrow(this.WaitForPageReadyHtmlIframeElement.name, 'No target doc');
      }
      this.Logger.FuncEnd(this.WaitForPageReadyHtmlIframeElement.name);;
    });
  }

  async WaitForPageReadyNative(targetDoc: IDataOneDoc) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForPageReadyNative.name);

      if (targetDoc) {
        var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForPageReadyNative.name);

        var isReady: boolean = false;

        let currentReadyState: string;

        while (iterationJr.DecrementAndKeepGoing() && !isReady) {
          isReady = this.IsDocumentReady(targetDoc.ContentDoc);

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
        this.Logger.Log('ready state: ' + currentReadyState + ' is ready: ' + isReady.toString());
      }
      else {
        this.Logger.ErrorAndThrow(this.WaitForPageReadyNative.name, 'No target doc');
      }
      this.Logger.FuncEnd(this.WaitForPageReadyNative.name);;
    });
  }

  async GetTopLevelIframe(targetDoc: IDataOneDoc): Promise<_BaseFrameProxy> {
    this.Logger.FuncStart(this.GetTopLevelIframe.name);

    var toReturn: _BaseFrameProxy = null;

    

    await this.FrameHelper.GetIFramesAsFrameProxies(targetDoc)
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

    this.Logger.FuncEnd(this.GetTopLevelIframe.name);

    return toReturn;
  }

  async WaitForIframeElemAndReturnWhenReady(haystackDoc: IDataOneDoc, selector: string, iframeNickName: string): Promise<_BaseFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForIframeElemAndReturnWhenReady.name);

      await this.WaitForAndReturnFoundElem(haystackDoc, selector)
        .then(async (foundElem: HTMLIFrameElement) => await this.FactoryHelp.FrameProxyForPromiseFactory(<HTMLIFrameElement>foundElem, iframeNickName))
        .then((result: _BaseFrameProxy) => this.WaitForReadyFrameProxy(result))
        .then((result) => resolve(result))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.WaitForIframeElemAndReturnWhenReady.name);
    });
  }
  async WaitForNewIframeContentEditor(allIframesBefore: _BaseFrameProxy[], targetDoc: IDataOneDoc): Promise<CEFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNewIframe.name);
      let toReturn: CEFrameProxy = null; 

      await this.WaitForNewIframe(allIframesBefore, targetDoc)
        .then((result: _BaseFrameProxy) => toReturn = <CEFrameProxy>result)
        .then(() => resolve(toReturn))
        .catch((err) => reject(this.WaitForNewIframeContentEditor.name + ' | ' + err));

      this.Logger.FuncEnd(this.WaitForNewIframe.name);
    });
  }

  async WaitForNewIframe(allIframesBefore: _BaseFrameProxy[], targetDoc: IDataOneDoc): Promise<_BaseFrameProxy> {
    return new Promise<_BaseFrameProxy>(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNewIframe.name);
      this.Logger.LogAsJsonPretty('allIframesBefore', allIframesBefore);
      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, allIframesBefore);
      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, targetDoc);

      var toReturn: _BaseFrameProxy = null;

      var iterationJr = new IterationDrone(this.Logger, this.WaitForNewIframe.name)
      let beforeCount: number = allIframesBefore.length;


      while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
        var allIframesAfter: _BaseFrameProxy[];

        await this.FrameHelper.GetIFramesAsFrameProxies(targetDoc)
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

      var iterationJr = new IterationDrone(this.Logger, this.WaitForAndReturnFoundElem.name, overrideIterCount);

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
      let iterHelper = new IterationDrone(this.Logger, this.TabWaitForReadyStateCompleteNative.name);

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

  TabChainSetHrefWaitForComplete(href: AbsoluteUrl) {
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
        var iterationJr = new IterationDrone(this.Logger, this.WaitForThenClick.name);

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