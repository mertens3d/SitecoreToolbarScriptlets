import { IterationHelper } from './IterationHelper';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IDataBrowserTab } from '../Interfaces/IDataBrowserWindow';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';
import { IScVerSpec } from '../Interfaces/IScVerSpec';
import { scWindowType } from '../Enums/scWindowType';
import { PromiseResult } from "./PromiseResult";
import { HelperBase } from './HelperBase';
import { AbsoluteUrl } from '../Interfaces/AbsoluteUrl';

export class PromiseHelper extends HelperBase {
  async  WaitForReadyIframe(dataOneIframe: IDataOneIframe) {
    return new Promise<IDataOneIframe>(async (resolve) => {
      this.Log.FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' ' + dataOneIframe.Id.AsShort);

      this.Log.DebugDataOneIframe(dataOneIframe);

      var iterationJr: IterationHelper = new IterationHelper(this.HelperHub, this.WaitForReadyIframe.name);

      var isReady: boolean = false;
      this.Log.MarkerA();

      while (iterationJr.DecrementAndKeepGoing() && !isReady) {
        this.Log.MarkerB();
        var currentReadyState: string = dataOneIframe.IframeElem.contentDocument.readyState.toString();
        var isReadyStateComplete = currentReadyState === 'complete';
        this.Log.Log('currentReadyState : ' + currentReadyState);;

        //if (currentReadyState !== 'uninitialized') {
        //  this.Debug.Log('id: ' + dataOneIframe.IframeElem.id)
        //}

        this.Log.MarkerC();

        this.Log.Log('isReadyStateComplete: ' + isReadyStateComplete);

        if (isReadyStateComplete) {
          this.Log.Log('toReturn A is true');
          isReady = true;
          dataOneIframe.ContentDoc = this.HelperHub.FactoryHelp.DataOneContentDocFactoryFromIframe(dataOneIframe.IframeElem, dataOneIframe.ContentDoc.ParentDoc,
            dataOneIframe.Nickname);
        } else {
          await iterationJr.Wait();
        }
      }

      this.Log.DebugDataOneIframe(dataOneIframe);

      this.Log.FuncEnd(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' : ' + currentReadyState + ' is ready: ' + isReady.toString());;
      resolve(dataOneIframe);
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
        var currentReadyState: string = targetDoc.Document.readyState.toString();
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
        result.RejectMessage = iterationJr.IsExhaustedMsg;
      }

      this.Log.FuncEnd(this.WaitForPageReadyNative.name, 'ready state: ' + currentReadyState + ' is ready: ' + isReady.toString());;

      if (result.WasSuccessful()) {
        resolve();
      } else {
        reject(result.RejectMessage);
      }
    });
  }
  async WaitForAndReturnReadyIframe(targetDoc: IDataOneDoc, selector: string, iframeObj: IDataOneIframe) {
    return new Promise<IDataOneIframe>(async (resolve) => {
      var iframeData: IDataOneIframe;

      await this.WaitForAndReturnFoundElem(targetDoc, selector)
        .then(async (foundElem) => {
          if (foundElem) {
            iframeObj.IframeElem = <HTMLIFrameElement>foundElem;

            this.Log.DebugDataOneIframe(iframeData);
            return iframeData;
          }
        })
        .then(async (iframeData) => {
          iframeData = await this.WaitForReadyIframe(iframeData);

          resolve(iframeData);
        });
    });
  }

  async WaitForAndReturnFoundElem(targetDoc: IDataOneDoc, selector: string, overrideIterCount = 8) {
    return new Promise<HTMLElement>(async (resolve, reject) => {
      this.Log.FuncStart(this.WaitForAndReturnFoundElem.name, 'selector: ' + selector + ' nickname: ' + targetDoc.Nickname);

      var found: HTMLElement = null;

      var iterationJr = new IterationHelper(this.HelperHub, this.WaitForAndReturnFoundElem.name, overrideIterCount);

      while (!found && iterationJr.DecrementAndKeepGoing()) {
        this.Log.LogVal('targetDoc.Document', targetDoc.Document.toString());
        this.Log.LogVal('targetDoc.Document.location', targetDoc.Document.location.toString());
        this.Log.LogVal('targetDoc.Document.location.href', targetDoc.Document.location.href);
        found = targetDoc.Document.querySelector(selector);

        if (found) {
          this.Log.Log('found');

          this.Log.LogVal('found.style.display', found.style.display);
          this.Log.FuncEnd(this.WaitForAndReturnFoundElem.name, selector + targetDoc.Document.location.href);

          resolve(found);
        } else {
          await iterationJr.Wait()
        }
      }

      if (!found && iterationJr.IsExhausted) {
        this.Log.FuncEnd(this.WaitForAndReturnFoundElem.name, selector + targetDoc.Document.location.href);
        reject('exhausted');
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
          result.RejectMessage = iterHelper.IsExhaustedMsg;
        }
      }

      if (result.WasSuccessful()) {
        resolve()
      } else {
        reject(result.RejectMessage);
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

  WaitForThenClick(selector: string[], targetDoc: IDataOneDoc) {
    return new Promise<void>(async (resolve, reject) => {
      if (targetDoc) {
        this.Log.FuncStart(this.WaitForThenClick.name, selector.length);

        var found: HTMLElement = null;

        var iterationJr = new IterationHelper(this.HelperHub, this.WaitForThenClick.name);

        while (!found && iterationJr.DecrementAndKeepGoing()) {// todo put back && !this.MsgMan().OperationCancelled) {
          for (var idx = 0; idx < selector.length; idx++) {
            found = targetDoc.Document.querySelector(selector[idx]);
            if (found) {
              break;
            }
          }

          if (found) {
            this.Log.Log('found and clicking');
            found.click();

            this.Log.FuncEnd(this.WaitForThenClick.name, selector.length);
            resolve();
          } else {
            await iterationJr.Wait()
          }
        }
      } else {
        reject();
      }

      this.Log.FuncEnd(this.WaitForThenClick.name, selector.length);
      if (!found && iterationJr.IsExhausted) {
        reject('exhausted');
      }
    });
  }
}