import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationHelper } from '../Classes/IterationHelper';
import { IDataOneDoc } from '../interfaces/IDataOneDoc';
import { IDataBrowserWindow } from '../interfaces/IDataBrowserWindow';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';
import { IScVerSpec } from '../Interfaces/IScVerSpec';

export class PromiseGeneric extends ContentManagerBase {
  constructor(xyyz: ContentHub) {
    xyyz.debug.FuncStart(PromiseGeneric.name);
    super(xyyz)
    xyyz.debug.FuncEnd(PromiseGeneric.name);
  }

  async  WaitForReadyIframe(dataOneIframe: IDataOneIframe) {
    return new Promise<IDataOneIframe>(async (resolve) => {
      this.debug().FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' ' + dataOneIframe.Id.asShort);

      this.debug().DebugDataOneIframe(dataOneIframe);

      var iterationJr: IterationHelper = new IterationHelper(this.Xyyz, this.WaitForReadyIframe.name);

      var isReady: boolean = false;
      this.debug().MarkerA();

      while (iterationJr.DecrementAndKeepGoing() && !isReady) {
        this.debug().MarkerB();
        var currentReadyState: string = dataOneIframe.IframeElem.contentDocument.readyState.toString();
        var isReadyStateComplete = currentReadyState === 'complete';
        this.debug().Log('currentReadyState : ' + currentReadyState);;

        //if (currentReadyState !== 'uninitialized') {
        //  this.debug().Log('id: ' + dataOneIframe.IframeElem.id)
        //}

        this.debug().MarkerC();

        this.debug().Log('isReadyStateComplete: ' + isReadyStateComplete);

        if (isReadyStateComplete) {
          this.debug().Log('toReturn A is true');
          isReady = true;
          dataOneIframe.ContentDoc = this.Utilites().DataOneContentDocFactoryFromIframe(dataOneIframe.IframeElem, dataOneIframe.ContentDoc.ParentDoc, dataOneIframe.Nickname);
        } else {
          await iterationJr.Wait();
        }
      }

      this.debug().DebugDataOneIframe(dataOneIframe);

      this.debug().FuncEnd(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' : ' + currentReadyState + ' is ready: ' + isReady.toString());;
      resolve(dataOneIframe);
    });
  }



  async WaitForAndReturnReadyIframe(targetDoc: IDataOneDoc, selector: string, nickname: string) {
    return new Promise<IDataOneIframe>(async (resolve) => {
      var iframeData: IDataOneIframe;

      await this.WaitForAndReturnFoundElem(targetDoc, selector)
        .then(async (foundElem) => {
          if (foundElem) {
            iframeData = this.Utilites().DateOneIframeFactory(<HTMLIFrameElement>foundElem, targetDoc, nickname)
            this.debug().DebugDataOneIframe(iframeData);
            return iframeData;
          }
        })
        .then(async (iframeData) => {
          iframeData = await this.PromiseGen().WaitForReadyIframe(iframeData);

          resolve(iframeData);
        });
    });
  }

  async WaitForAndReturnFoundElem(targetDoc: IDataOneDoc, selector: string, overrideIterCount = 8) {
    return new Promise<HTMLElement>(async (resolve, reject) => {
      this.debug().FuncStart(this.WaitForAndReturnFoundElem.name, 'selector: ' + selector + ' nickname: ' + targetDoc.Nickname);

      var found: HTMLElement = null;

      var iterationJr = new IterationHelper(this.Xyyz, this.WaitForAndReturnFoundElem.name, overrideIterCount);

      while (!found && iterationJr.DecrementAndKeepGoing()) {
        this.debug().LogVal('targetDoc.Document', targetDoc.Document.toString());
        this.debug().LogVal('targetDoc.Document.location', targetDoc.Document.location.toString());
        this.debug().LogVal('targetDoc.Document.location.href', targetDoc.Document.location.href);
        found = targetDoc.Document.querySelector(selector);

        if (found) {
          this.debug().Log('found');

          this.debug().LogVal('found.style.display', found.style.display);
          this.debug().FuncEnd(this.WaitForAndReturnFoundElem.name, selector + targetDoc.Document.location.href);

          resolve(found);
        } else {
          await iterationJr.Wait()
        }
      }

      if (!found && iterationJr.IsExhausted) {
        this.debug().FuncEnd(this.WaitForAndReturnFoundElem.name, selector + targetDoc.Document.location.href);
        reject('exhausted');
      }
    });
  }

  async WaitForPageReadyNative(targetWindow: IDataBrowserWindow) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.WaitForPageReadyNative.name);
      let iterationJr = new IterationHelper(this.Xyyz,  this.WaitForThenClick.name, 5);
      var loaded: boolean = false;

      if (this.MiscMan().NotNullOrUndefined(targetWindow, this.WaitForPageReadyNative.name + ' document'))
      //&& this.MiscMan().NotNullOrUndefined(document.location, this.WaitForPageReadyNative.name + ' location'))
      {
        //this.debug().LogVal('document', targetWindow.DataDocSelf.Document.location.href);
      }
      //  this.debug().FuncEnd(this.WaitForPageReadyNative.name);

      //  if (loaded) {
      //    resolve();
      //  } else {
      //    reject();
      //  }
    });
  }

  WaitForAndClickWithPayload(selector: string, targetDoc: IDataOneDoc, payload: any) {
    return new Promise<any>(async (resolve, reject) => {
      this.debug().FuncStart(this.WaitForAndClickWithPayload.name, selector);

      await this.PromiseGen().WaitForThenClick(selector, targetDoc)
        .then(() => resolve(payload))
        .catch(ex => {
          this.debug().Error(this.WaitForAndClickWithPayload.name, ex);
          reject(ex);
        });
    });
  }
  async WaitForPageReady(targetWindow: IDataBrowserWindow) {
    return new Promise<void>(async (resolve, reject) => {
      this.debug().FuncStart(this.WaitForPageReady.name);

      this.debug().NotNullCheck('toReturn', targetWindow);
      this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf);
      this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document);
      this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location);
      this.debug().NotNullCheck('toReturn', targetWindow.DataDocSelf.Document.location.href);
      this.debug().LogVal('targetWindow.DataDocSelf.Document.location.href', targetWindow.DataDocSelf.Document.location.href);

      if (targetWindow) {
        await this.WaitForPageReadyNative(targetWindow)
          .then(() => resolve())
          .catch((ex) => {
            reject(ex);
          })
      }
      this.debug().FuncEnd(this.WaitForPageReady.name);
    });
  }

  async RaceWaitAndClick(selector: IScVerSpec, targetDoc: IDataOneDoc, resolveFn: Function = null) {
    this.debug().FuncStart(this.RaceWaitAndClick.name);

    var prom1 = this.WaitForThenClick(selector.sc920, targetDoc, resolveFn);
    var prom2 = this.WaitForThenClick(selector.sc820, targetDoc, resolveFn);

    this.debug().FuncEnd(this.RaceWaitAndClick.name);
    return await Promise.race([prom1, prom2]);
  }

  WaitForThenClick(selector: string, targetDoc: IDataOneDoc, resolveFn: Function = null) {
    return new Promise<void>(async (resolve, reject) => {
      if (targetDoc) {
        this.debug().FuncStart(this.WaitForThenClick.name, selector);

        var found: HTMLElement = null;

        var iterationJr = new IterationHelper(this.Xyyz,  this.WaitForThenClick.name);

        while (!found && iterationJr.DecrementAndKeepGoing() && !this.MsgMan().OperationCancelled) {
          found = targetDoc.Document.querySelector(selector);

          if (found) {
            this.debug().Log('found and clicking');
            found.click();

            this.debug().FuncEnd(this.WaitForThenClick.name, selector);
            if (resolveFn) {
              resolveFn();
            }
            resolve();
          } else {
            await iterationJr.Wait()
          }
        }
      } else {
        reject();
      }

      this.debug().FuncEnd(this.WaitForThenClick.name, selector);
      if (!found && iterationJr.IsExhausted) {
        reject('exhausted');
      }
    });
  }
}