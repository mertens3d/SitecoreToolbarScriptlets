import { IterationHelper } from './IterationHelper';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';
import { PromiseResult } from "./PromiseResult";
import { HelperBase } from './HelperBase';
import { IScVerSpec } from '../Interfaces/IScVerSpec';
import { AbsoluteUrl } from '../Interfaces/AbsoluteUrl';
import { IDataBrowserTab } from '../Interfaces/IDataBrowserWindow';

export class PromiseHelper extends HelperBase {
  async  WaitForReadyIframe(dataOneIframe: IDataOneIframe) {
    return new Promise(async (resolve, reject) => {
      this.Log.FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' ' + dataOneIframe.Id.AsShort);

      var iterationJr: IterationHelper = new IterationHelper(this.HelperHub, this.WaitForReadyIframe.name);
      let promiseResult: PromiseResult = new PromiseResult(this.WaitForReadyIframe.name, this.Log);

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
        promiseResult.MarkFailed( iterationJr.IsExhaustedMsg);
      }

      this.Log.LogAsJsonPretty('dataOneIframe', dataOneIframe);

      this.Log.FuncEnd(this.WaitForReadyIframe.name);

      if (promiseResult.WasSuccessful()) {
        resolve();
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }

  async WaitForPageReadyNative(targetDoc: IDataOneDoc) {
    return new Promise(async (resolve, reject) => {
      this.Log.FuncStart(this.WaitForPageReadyNative.name);

      var result: PromiseResult = new PromiseResult(this.WaitForPageReadyNative.name, this.Log);

      this.Log.DebugIDataOneDoc(targetDoc);

      var iterationJr: IterationHelper = new IterationHelper(this.HelperHub, this.WaitForPageReadyNative.name);

      var isReady: boolean = false;
      this.Log.MarkerA();

      while (iterationJr.DecrementAndKeepGoing() && !isReady) {
        this.Log.MarkerB();
        var currentReadyState: string = targetDoc.ContentDoc.readyState.toString();
        var isReadyStateComplete = currentReadyState === 'complete';
        this.Log.LogVal('readyState', currentReadyState);;
        this.Log.LogVal('isReadyStateComplete', isReadyStateComplete);

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

      this.Log.FuncEnd(this.WaitForPageReadyNative.name, 'ready state: ' + currentReadyState + ' is ready: ' + isReady.toString());;

      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectReasons);
      }
    });
  }
  async WaitForIframeElemAndReturnWhenReady(haystackDoc: IDataOneDoc, selector: string, iframeNickName: string) {
    return new Promise<IDataOneIframe>(async (resolve, reject) => {
      this.Log.FuncStart(this.WaitForIframeElemAndReturnWhenReady.name);

      var toReturnIframeData: IDataOneIframe = null;

      let promiseResult: PromiseResult = new PromiseResult(this.WaitForIframeElemAndReturnWhenReady.name, this.Log);

      await this.WaitForAndReturnFoundElem(haystackDoc, selector)
        .then(async (foundElem: HTMLIFrameElement) => {
          if (foundElem) {
            toReturnIframeData = this.HelperHub.FactoryHelp.DataOneIframeFactory(<HTMLIFrameElement>foundElem, iframeNickName);
          }
        })
        .then(() => this.WaitForReadyIframe(toReturnIframeData))
        .then(() => {
          toReturnIframeData.ContentDoc = this.HelperHub.FactoryHelp.DataOneContentDocFactoryFromIframe(toReturnIframeData);
          promiseResult.MarkSuccessful();
        })
        .catch((err) => promiseResult.MarkFailed(err));

      this.Log.FuncEnd(this.WaitForIframeElemAndReturnWhenReady.name);
      if (promiseResult.WasSuccessful()) {
        resolve(toReturnIframeData);
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }

  async WaitForAndReturnFoundElem(haystackDoc: IDataOneDoc, selector: string, overrideIterCount = 8) {
    return new Promise<HTMLElement>(async (resolve, reject) => {
      this.Log.FuncStart(this.WaitForAndReturnFoundElem.name);
      this.Log.LogVal('selector', selector);
      this.Log.LogVal('doc nickname', haystackDoc.Nickname);

      var toReturnFoundElem: HTMLElement = null;
      let promiseResult: PromiseResult = new PromiseResult(this.WaitForAndReturnFoundElem.name, this.Log);

      var iterationJr = new IterationHelper(this.HelperHub, this.WaitForAndReturnFoundElem.name, overrideIterCount);

      while (!toReturnFoundElem && iterationJr.DecrementAndKeepGoing()) {
        this.Log.LogVal('targetDoc.Document', haystackDoc.ContentDoc.toString());
        this.Log.LogVal('targetDoc.Document.location', haystackDoc.ContentDoc.location.toString());
        this.Log.LogVal('targetDoc.Document.location.href', haystackDoc.ContentDoc.location.href);
        toReturnFoundElem = haystackDoc.ContentDoc.querySelector(selector);

        if (toReturnFoundElem) {
          this.Log.Log('found');

          this.Log.LogVal('found.style.display', toReturnFoundElem.style.display);

          promiseResult.MarkSuccessful();
        } else {
          await iterationJr.Wait();
        }
      }

      if (!toReturnFoundElem && iterationJr.IsExhausted) {
        promiseResult.MarkFailed(iterationJr.IsExhaustedMsg);
      }
      this.Log.FuncEnd(this.WaitForAndReturnFoundElem.name);

      if (promiseResult.WasSuccessful()) {
        resolve(toReturnFoundElem);
      } else {
        reject(promiseResult.RejectReasons);
      }
    });
  }

  WaitForAndClickWithPayload(selector: string, targetDoc: IDataOneDoc, payload: any) {
    return new Promise<any>(async (resolve, reject) => {
      this.Log.FuncStart(this.WaitForAndClickWithPayload.name, selector);

      await this.WaitForThenClick([selector], targetDoc)
        .then(() => resolve(payload))
        .catch(ex => {
          this.Log.Error(this.WaitForAndClickWithPayload.name, ex);
          reject(ex);
        });
    });
  }

  TabWaitForReadyStateCompleteNative(browserTab: browser.tabs.Tab) {
    return new Promise(async (resolve, reject) => {
      let iterHelper = new IterationHelper(this.HelperHub, this.TabWaitForReadyStateCompleteNative.name);

      let result: PromiseResult = new PromiseResult(this.TabWaitForReadyStateCompleteNative.name, this.Log);

      while (browserTab.status !== 'complete' && iterHelper.DecrementAndKeepGoing()) {
       

        this.Log.LogVal('tab status', browserTab.status);
        await iterHelper.Wait;
      }

      if (browserTab.status === 'complete') {
        result.MarkSuccessful();
      } else {
        result.MarkFailed('browser status: ' + browserTab.status)
        if (iterHelper.IsExhausted) {
          result.MarkFailed( iterHelper.IsExhaustedMsg);
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
      this.Log.FuncStart(this.TabChainSetHrefWaitForComplete.name, href.AbsUrl);

      try {
        await browser.tabs.update(targetTab.Tab.id, { url: href.AbsUrl })
          .then(() => this.TabWaitForReadyStateCompleteNative(targetTab.Tab))
          .then(resolve)
          .catch(reject);
      } catch (e) {
        this.Log.Error(this.TabChainSetHrefWaitForComplete.name, e.toString());
        reject(e);
      }
      this.Log.FuncEnd(this.TabChainSetHrefWaitForComplete.name, href.AbsUrl);
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
      this.Log.FuncStart(this.RaceWaitAndClick.name);

      await this.WaitForThenClick([selector.sc920, selector.sc820], targetDoc)
        .then(() => {
          this.Log.FuncEnd(this.RaceWaitAndClick.name);
          resolve();
        })
        .catch((ex) => {
          this.Log.FuncEnd(this.RaceWaitAndClick.name);
          reject(ex);
        });
    });
  }

  WaitForThenClick(selectorAr: string[], targetDoc: IDataOneDoc) {
    return new Promise<void>(async (resolve, reject) => {
      this.Log.FuncStart(this.WaitForThenClick.name);
      let promiseResults: PromiseResult = new PromiseResult(this.WaitForThenClick.name, this.Log);

      if (targetDoc) {
        this.Log.LogAsJsonPretty('selectors', selectorAr);

        var found: HTMLElement = null;
        var iterationJr = new IterationHelper(this.HelperHub, this.WaitForThenClick.name);

        while (!found && iterationJr.DecrementAndKeepGoing()) {// todo put back && !this.MsgMan().OperationCancelled) {
          for (var idx = 0; idx < selectorAr.length; idx++) {
            found = targetDoc.ContentDoc.querySelector(selectorAr[idx]);
            if (found) {
              this.Log.LogVal('found target', selectorAr[idx]);
              break;
            }
          }

          if (found) {
            this.Log.Log('clicking');
            found.click();
            promiseResults.MarkSuccessful();
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

      this.Log.FuncEnd(this.WaitForThenClick.name);

      if (promiseResults.WasSuccessful()) {
        resolve();
      } else {
        reject(promiseResults.RejectReasons);
      }
    });
  }
}