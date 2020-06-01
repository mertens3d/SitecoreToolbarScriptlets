﻿import { IterationDrone } from '../Agents/Drones/IterationDrone';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';
import { PromiseResult } from "./PromiseResult";
import { HelperBase } from './HelperBase';
import { IScVerSpec } from '../Interfaces/IScVerSpec';
import { AbsoluteUrl } from '../Interfaces/AbsoluteUrl';
import { IDataBrowserTab } from '../Interfaces/IDataBrowserWindow';
import { IPromiseHelper } from '../Interfaces/IPromiseHelper';

export class PromiseHelper extends HelperBase implements IPromiseHelper {
  async WaitForReadyIframe(dataOneIframe: IDataOneIframe) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' ' + dataOneIframe.Id.AsShort);

      var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForReadyIframe.name);
      let promiseResult: PromiseResult = new PromiseResult(this.WaitForReadyIframe.name, this.Logger);

      while (iterationJr.DecrementAndKeepGoing() && !promiseResult.WasSuccessful()) {
        var currentReadyState: string = dataOneIframe.IframeElem.contentDocument.readyState.toString();
        var isReadyStateComplete = currentReadyState === 'complete';

        if (isReadyStateComplete) {
          promiseResult.MarkSuccessful();
        } else {
          await iterationJr.Wait();
        }
      }

      if (iterationJr.IsExhausted) {
        promiseResult.MarkFailed(iterationJr.IsExhaustedMsg);
      }

      //this.AllHelperAgents.Logger.LogAsJsonPretty('dataOneIframe', dataOneIframe);

      this.Logger.FuncEnd(this.WaitForReadyIframe.name);

      if (promiseResult.WasSuccessful()) {
        resolve();
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }

  async WaitForPageReadyNative(targetDoc: IDataOneDoc) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForPageReadyNative.name);

      var result: PromiseResult = new PromiseResult(this.WaitForPageReadyNative.name, this.Logger);

      this.Logger.DebugIDataOneDoc(targetDoc);

      var iterationJr: IterationDrone = new IterationDrone(this.Logger, this.WaitForPageReadyNative.name);

      var isReady: boolean = false;
      this.Logger.MarkerA();

      while (iterationJr.DecrementAndKeepGoing() && !isReady) {
        this.Logger.MarkerB();
        var currentReadyState: string = targetDoc.ContentDoc.readyState.toString();
        var isReadyStateComplete = currentReadyState === 'complete';
        this.Logger.LogVal('readyState', currentReadyState);;
        this.Logger.LogVal('isReadyStateComplete', isReadyStateComplete);

        if (isReadyStateComplete) {
          isReady = true;
          result.MarkSuccessful();
        } else {
          await iterationJr.Wait();
        }
      }

      if (iterationJr.IsExhausted) {
        result.MarkFailed(iterationJr.IsExhaustedMsg);
      }

      this.Logger.FuncEnd(this.WaitForPageReadyNative.name, 'ready state: ' + currentReadyState + ' is ready: ' + isReady.toString());;

      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }
  async WaitForIframeElemAndReturnWhenReady(haystackDoc: IDataOneDoc, selector: string, iframeNickName: string) {
    return new Promise<IDataOneIframe>(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForIframeElemAndReturnWhenReady.name);

      var toReturnIframeData: IDataOneIframe = null;

      let promiseResult: PromiseResult = new PromiseResult(this.WaitForIframeElemAndReturnWhenReady.name, this.Logger);

      await this.WaitForAndReturnFoundElem(haystackDoc, selector)
        .then(async (foundElem: HTMLIFrameElement) => {
          if (foundElem) {
            toReturnIframeData = this.HelperAgent.FactoryHelp.DataOneIframeFactory(<HTMLIFrameElement>foundElem, iframeNickName);
          }
        })
        .then(() => this.WaitForReadyIframe(toReturnIframeData))
        .then(() => {
          toReturnIframeData.ContentDoc = this.HelperAgent.FactoryHelp.DataOneContentDocFactoryFromIframe(toReturnIframeData);
          promiseResult.MarkSuccessful();
        })
        .catch((err) => promiseResult.MarkFailed(err));

      this.Logger.FuncEnd(this.WaitForIframeElemAndReturnWhenReady.name);
      if (promiseResult.WasSuccessful()) {
        resolve(toReturnIframeData);
      } else {
        reject(promiseResult.RejectReasons);
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
        this.Logger.LogVal('targetDoc.Document', haystackDoc.ContentDoc.toString());
        this.Logger.LogVal('targetDoc.Document.location', haystackDoc.ContentDoc.location.toString());
        this.Logger.LogVal('targetDoc.Document.location.href', haystackDoc.ContentDoc.location.href);
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
          this.Logger.Error(this.WaitForAndClickWithPayload.name, ex);
          reject(ex);
        });
    });
  }

  TabWaitForReadyStateCompleteNative(browserTab: browser.tabs.Tab) {
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

  TabChainSetHrefWaitForComplete(href: AbsoluteUrl, targetTab: IDataBrowserTab) {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.TabChainSetHrefWaitForComplete.name, href.AbsUrl);

      try {
        await browser.tabs.update(targetTab.Tab.id, { url: href.AbsUrl })
          .then(() => this.TabWaitForReadyStateCompleteNative(targetTab.Tab))
          .then(resolve)
          .catch(reject);
      } catch (e) {
        this.Logger.Error(this.TabChainSetHrefWaitForComplete.name, e.toString());
        reject(e);
      }
      this.Logger.FuncEnd(this.TabChainSetHrefWaitForComplete.name, href.AbsUrl);
    });
  }

  //async SetHrefAndWaitForReadyStateComplete(href :string, targetTab: IDataBrowserTab) {
  //  return new Promise(async (resolve, reject) => {
  //    this.Debug.FuncStart(this.SetHrefAndWaitForReadyStateComplete.name, href);

  //    var isCorrectHref = targetTab.Tab.url = href;

  //    //if (targetTab.ScWindowType !== targetWindowType) {
  //      targetTab.Tab.url = href;
  //      //targetTab.Window.location.href = href;
  //    //}

  //    //await this.WaitForPageReady

  //    await this.WaitForPageReadyNative(targetTab.DataDocSelf)

  //      //.then( () => this.MsgMan().w())
  //      .then(() => resolve())
  //      .catch(() => reject());

  //    this.Debug.FuncEnd(this.SetHrefAndWaitForReadyStateComplete.name);
  //  });
  //}

  //async SetPageAndWaitForReady(targetWindowType: scWindowType, targetWindow: IDataBrowserWindow) {
  //  return new Promise<void>(async (resolve, reject) => {
  //    var iterationJr = new IterationHelper(this.Xyyz, this.SetPageAndWaitForReady.name);
  //    if (targetWindow.WindowType !== targetWindowType) {
  //      targetWindow.DataDocSelf.Document.location.href =
  //    }
  //    while (!found && iterationJr.DecrementAndKeepGoing() && !this.MsgMan().OperationCancelled) {
  //      if (targetWindow) {
  //      } else {
  //        reject();
  //      }
  //    }
  //  }

  //async WaitForPageReady(targetWindow: IDataBrowserTab) {
  //  return new Promise<void>(async (resolve, reject) => {
  //    this.Debug.FuncStart(this.WaitForPageReady.name);

  //    this.Debug.DebugIDataBrowserWindow(targetWindow);

  //    if (targetWindow) {
  //      await this. WaitForPageReadyNative(targetWindow.DataDocSelf)
  //        .then(() => resolve())
  //        .catch((ex) => {
  //          reject(ex);
  //        })
  //    }
  //    this.Debug.FuncEnd(this.WaitForPageReady.name);
  //  });
  //}

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

  WaitForThenClick(selectorAr: string[], targetDoc: IDataOneDoc) {
    return new Promise<void>(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForThenClick.name);
      let promiseResults: PromiseResult = new PromiseResult(this.WaitForThenClick.name, this.Logger);

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

              promiseResults.MarkSuccessful();
            } catch (e) {
              promiseResults.MarkFailed(e);
            }
          } else {
            await iterationJr.Wait()
          }
        }
      } else {
        promiseResults.MarkFailed('no target doc');
      }

      if (!found && iterationJr.IsExhausted) {
        promiseResults.MarkFailed(iterationJr.IsExhaustedMsg);
      }

      this.Logger.FuncEnd(this.WaitForThenClick.name);

      if (promiseResults.WasSuccessful()) {
        resolve();
      } else {
        reject(promiseResults.RejectReasons);
      }
    });
  }
}