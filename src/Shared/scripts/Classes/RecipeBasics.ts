import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { IterationDrone } from '../Agents/Drones/IterationDrone/IterationDrone';
import { Guid } from '../Helpers/Guid';
import { AbsoluteUrl } from '../Interfaces/AbsoluteUrl';
import { IDataOneDoc } from '../Interfaces/Data/IDataOneDoc';
import { IframeProxy } from '../Interfaces/Data/IDataOneIframe';
import { ContentConst } from '../Interfaces/InjectConst';
import { IRecipeBasics } from '../Interfaces/IPromiseHelper';
import { IScVerSpec } from '../Interfaces/IScVerSpec';
import { PromiseResult } from "./PromiseResult";
import { ILoggerAgent } from '../Interfaces/Agents/ILoggerAgent';
import { IFactoryHelper } from '../Interfaces/IFactoryHelper';
import { FactoryHelper } from '../Helpers/FactoryHelper';
import { IframeHelper } from '../../../Content/scripts/Helpers/IframeHelper';
import { SharedConst } from '../SharedConst';

export class RecipeBasics extends LoggableBase implements IRecipeBasics {
  private FactoryHelp: IFactoryHelper;

  constructor(logger: ILoggerAgent) {
    super(logger);
    this.FactoryHelp = new FactoryHelper(this.Logger);
  }

  async WaitForReadyIframe(dataOneIframe: IframeProxy): Promise<IframeProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' ' + Guid.AsShort(dataOneIframe.Id));

      var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForReadyIframe.name);
      let IsReady: boolean = false;

      while (iterationJr.DecrementAndKeepGoing() && !IsReady) {
        var currentReadyState: string = dataOneIframe.IframeElem.contentDocument.readyState.toString();
        var isReadyStateComplete = currentReadyState === 'complete';
        var currentDocUrl = dataOneIframe.IframeElem.contentDocument.URL;

        if (isReadyStateComplete && (currentDocUrl !== SharedConst.Const.UrlSuffix.AboutBlank)) {
          this.Logger.LogVal('currentDocUrl', currentDocUrl);
          IsReady = true;
        } else {
          await iterationJr.Wait();
        }
      }
      if (IsReady) {
        this.Logger.Log(dataOneIframe.GetContentDoc().ContentDoc.URL);
        resolve(dataOneIframe);
      }

      if (iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
      }

      this.Logger.FuncEnd(this.WaitForReadyIframe.name);
    });
  }

  async WaitForPageReadyNative(targetDoc: IDataOneDoc) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForPageReadyNative.name);

      if (targetDoc) {
        var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForPageReadyNative.name);

        var isReady: boolean = false;

        let currentReadyState: string;

        let aboutBlank: string = 'about:blank';
        let lastHref: string = '';

        while (iterationJr.DecrementAndKeepGoing() && !isReady) {
          currentReadyState = targetDoc.ContentDoc.readyState.toString();
          var isReadyStateComplete = currentReadyState === 'complete';

          if (targetDoc && targetDoc.ContentDoc && targetDoc.ContentDoc.location) {
            lastHref = targetDoc.ContentDoc.location.href;
          }

          this.Logger.LogVal('lastHref', lastHref);;
          this.Logger.LogVal('readyState', currentReadyState);;
          this.Logger.LogVal('isReadyStateComplete', isReadyStateComplete);

          if (isReadyStateComplete && lastHref !== aboutBlank && lastHref != '') {
            isReady = true;
            resolve();
          } else {
            await iterationJr.Wait();
          }
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

  async GetTopLevelIframe(targetDoc: IDataOneDoc): Promise<IframeProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetTopLevelIframe.name);

      var toReturn: IframeProxy = null;

      var allIframe: IframeProxy[];
      let iframeHelper = new IframeHelper(this.Logger);

      await iframeHelper.GetHostedIframes(targetDoc)
        .then((result) => {
          allIframe = result

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
        .then(() => resolve(toReturn))
        .catch((err) => this.Logger.ErrorAndThrow(this.GetTopLevelIframe.name, err));

      this.Logger.FuncEnd(this.GetTopLevelIframe.name);
    })
  }

  async WaitForIframeElemAndReturnWhenReady(haystackDoc: IDataOneDoc, selector: string, iframeNickName: string): Promise<IframeProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForIframeElemAndReturnWhenReady.name);

      var toReturnIframeProxy: IframeProxy = null;


      await this.WaitForAndReturnFoundElem(haystackDoc, selector)
        .then(async (foundElem: HTMLIFrameElement) => {
          if (foundElem) {
            toReturnIframeProxy = this.FactoryHelp.DataOneIframeFactory(<HTMLIFrameElement>foundElem, iframeNickName);
          }
        })
        .then(() => this.WaitForReadyIframe(toReturnIframeProxy))
        .then(() => {
          resolve(toReturnIframeProxy);
        })
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.WaitForIframeElemAndReturnWhenReady.name);
    });
  }

  async WaitForNewIframe(allIframesBefore: IframeProxy[], targetDoc: IDataOneDoc): Promise<IframeProxy> {
    return new Promise<IframeProxy>(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNewIframe.name);
      this.Logger.LogAsJsonPretty('allIframesBefore', allIframesBefore);
      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, allIframesBefore);
      this.Logger.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, targetDoc);

      var toReturn: IframeProxy = null;

      var iterationJr = new IterationDrone(this.Logger, this.WaitForNewIframe.name)
      let beforeCount: number = allIframesBefore.length;

      let iframeHelper = new IframeHelper(this.Logger);

      while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
        var allIframesAfter: IframeProxy[];
        await iframeHelper.GetHostedIframes(targetDoc)
          .then((result) => allIframesAfter = result)
          .catch((err) => this.Logger.ErrorAndThrow(this.WaitForNewIframe.name, err));

        var count: number = allIframesAfter.length;
        this.Logger.Log('iFrame count before: ' + beforeCount);
        this.Logger.Log('iFrame count after: ' + allIframesAfter.length);

        if (count > beforeCount) {
          var newIframes: IframeProxy[] = allIframesAfter.filter(e => !allIframesBefore.includes(e));

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
  async WaitForAndReturnFoundElem(haystackDoc: IDataOneDoc, selector: string, overrideIterCount = 8) {
    return new Promise<HTMLElement>(async (resolve, reject) => {
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
        }
        )
        .then(resolve)
        .catch((ex) => reject(ex));

      this.Logger.FuncEnd(this.TabChainSetHrefWaitForComplete.name, href.AbsUrl);
    });
  }

  async RaceWaitAndClick(selector: IScVerSpec, targetDoc: IDataOneDoc) {
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
        this.Logger.LogAsJsonPretty('selectors', selectorAr);

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