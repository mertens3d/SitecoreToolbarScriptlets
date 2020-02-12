import { IterationHelper } from './IterationHelper';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IDataBrowserTab } from '../Interfaces/IDataBrowserWindow';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';
import { IScVerSpec } from '../Interfaces/IScVerSpec';
import { scWindowType } from '../Enums/scWindowType';
import { ResultSuccessFail } from './ResultSuccessFail';
import { HelperBase } from './HelperBase';

export class PromiseHelper extends HelperBase {

  async  WaitForReadyIframe(dataOneIframe: IDataOneIframe) {
    return new Promise<IDataOneIframe>(async (resolve) => {
      this.Debug.FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' ' + dataOneIframe.Id.AsShort);

      this.Debug.DebugDataOneIframe(dataOneIframe);

      var iterationJr: IterationHelper = new IterationHelper(this.HelperHub, this.WaitForReadyIframe.name);

      var isReady: boolean = false;
      this.Debug.MarkerA();

      while (iterationJr.DecrementAndKeepGoing() && !isReady) {
        this.Debug.MarkerB();
        var currentReadyState: string = dataOneIframe.IframeElem.contentDocument.readyState.toString();
        var isReadyStateComplete = currentReadyState === 'complete';
        this.Debug.Log('currentReadyState : ' + currentReadyState);;

        //if (currentReadyState !== 'uninitialized') {
        //  this.Debug.Log('id: ' + dataOneIframe.IframeElem.id)
        //}

        this.Debug.MarkerC();

        this.Debug.Log('isReadyStateComplete: ' + isReadyStateComplete);

        if (isReadyStateComplete) {
          this.Debug.Log('toReturn A is true');
          isReady = true;
          dataOneIframe.ContentDoc = this.HelperHub.FactoryHelp.DataOneContentDocFactoryFromIframe(dataOneIframe.IframeElem, dataOneIframe.ContentDoc.ParentDoc,
            dataOneIframe.Nickname);
        } else {
          await iterationJr.Wait();
        }
      }

      this.Debug.DebugDataOneIframe(dataOneIframe);

      this.Debug.FuncEnd(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' : ' + currentReadyState + ' is ready: ' + isReady.toString());;
      resolve(dataOneIframe);
    });
  }
  async WaitForPageReadyNative(targetDoc: IDataOneDoc) {
    return new Promise(async (resolve, reject) => {
      this.Debug.FuncStart(this.WaitForPageReadyNative.name);

      var result: ResultSuccessFail = new ResultSuccessFail();

      this.Debug.DebugIDataOneDoc(targetDoc);

      var iterationJr: IterationHelper = new IterationHelper(this.HelperHub, this.WaitForPageReadyNative.name);

      var isReady: boolean = false;
      this.Debug.MarkerA();

      while (iterationJr.DecrementAndKeepGoing() && !isReady) {
        this.Debug.MarkerB();
        var currentReadyState: string = targetDoc.Document.readyState.toString();
        var isReadyStateComplete = currentReadyState === 'complete';
        this.Debug.LogVal('readyState', currentReadyState);;
        this.Debug.LogVal('isReadyStateComplete', isReadyStateComplete);

        if (isReadyStateComplete) {
          isReady = true;
          result.Succeeded = true;
        } else {
          await iterationJr.Wait();
        }
      }

      if (iterationJr.IsExhausted) {
        result.Succeeded = false;
        result.FailMessage = iterationJr.IsExhaustedMsg;
      }

      this.Debug.FuncEnd(this.WaitForPageReadyNative.name, 'ready state: ' + currentReadyState + ' is ready: ' + isReady.toString());;

      if (result.Succeeded) {
        resolve();
      } else {
        reject(result.FailMessage);
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

            this.Debug.DebugDataOneIframe(iframeData);
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
      this.Debug.FuncStart(this.WaitForAndReturnFoundElem.name, 'selector: ' + selector + ' nickname: ' + targetDoc.Nickname);

      var found: HTMLElement = null;

      var iterationJr = new IterationHelper(this.HelperHub, this.WaitForAndReturnFoundElem.name, overrideIterCount);

      while (!found && iterationJr.DecrementAndKeepGoing()) {
        this.Debug.LogVal('targetDoc.Document', targetDoc.Document.toString());
        this.Debug.LogVal('targetDoc.Document.location', targetDoc.Document.location.toString());
        this.Debug.LogVal('targetDoc.Document.location.href', targetDoc.Document.location.href);
        found = targetDoc.Document.querySelector(selector);

        if (found) {
          this.Debug.Log('found');

          this.Debug.LogVal('found.style.display', found.style.display);
          this.Debug.FuncEnd(this.WaitForAndReturnFoundElem.name, selector + targetDoc.Document.location.href);

          resolve(found);
        } else {
          await iterationJr.Wait()
        }
      }

      if (!found && iterationJr.IsExhausted) {
        this.Debug.FuncEnd(this.WaitForAndReturnFoundElem.name, selector + targetDoc.Document.location.href);
        reject('exhausted');
      }
    });
  }

  

  WaitForAndClickWithPayload(selector: string, targetDoc: IDataOneDoc, payload: any) {
    return new Promise<any>(async (resolve, reject) => {
      this.Debug.FuncStart(this.WaitForAndClickWithPayload.name, selector);

      await this.WaitForThenClick([selector], targetDoc)
        .then(() => resolve(payload))
        .catch(ex => {
          this.Debug.Error(this.WaitForAndClickWithPayload.name, ex);
          reject(ex);
        });
    });
  }

  async SetHrefAndWaitForReadyStateComplete(href :string, targetWindow: IDataBrowserTab, targetWindowType: scWindowType) {
    return new Promise(async (resolve, reject) => {
      this.Debug.FuncStart(this.SetHrefAndWaitForReadyStateComplete.name, href);


      var isCorrectHref = targetWindow.Window.location.href = href;

      if (targetWindow.ScWindowType !== targetWindowType) {
        targetWindow.Window.location.href = href;
      }

      await this.WaitForPageReadyNative(targetWindow.DataDocSelf)
     
        //.then( () => this.MsgMan().w())
        .then(() => resolve())
        .catch(() => reject());

      this.Debug.FuncEnd(this.SetHrefAndWaitForReadyStateComplete.name);
    });
  }

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

  async WaitForPageReady(targetWindow: IDataBrowserTab) {
    return new Promise<void>(async (resolve, reject) => {
      this.Debug.FuncStart(this.WaitForPageReady.name);

      this.Debug.DebugIDataBrowserWindow(targetWindow);

      if (targetWindow) {
        await this. WaitForPageReadyNative(targetWindow.DataDocSelf)
          .then(() => resolve())
          .catch((ex) => {
            reject(ex);
          })
      }
      this.Debug.FuncEnd(this.WaitForPageReady.name);
    });
  }

  async RaceWaitAndClick(selector: IScVerSpec, targetDoc: IDataOneDoc) {
    return new Promise(async (resolve, reject) => {
      this.Debug.FuncStart(this.RaceWaitAndClick.name);

      var raceFlag: boolean = false;

      var prom1 = this.WaitForThenClick([selector.sc920, selector.sc820], targetDoc);

      this.Debug.FuncEnd(this.RaceWaitAndClick.name);
      await prom1
        .then(() => {
          resolve();
        })
        .catch((ex) => {
          reject(ex);
        });
    });
  }

  WaitForThenClick(selector: string[], targetDoc: IDataOneDoc) {
    return new Promise<void>(async (resolve, reject) => {
      if (targetDoc) {
        this.Debug.FuncStart(this.WaitForThenClick.name, selector.length);

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
            this.Debug.Log('found and clicking');
            found.click();

            this.Debug.FuncEnd(this.WaitForThenClick.name, selector.length);
            resolve();
          } else {
            await iterationJr.Wait()
          }
        }
      } else {
        reject();
      }

      this.Debug.FuncEnd(this.WaitForThenClick.name, selector.length);
      if (!found && iterationJr.IsExhausted) {
        reject('exhausted');
      }
    });
  }
}