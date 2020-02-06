import { ContentHub } from '../Managers/ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { IterationHelper } from '../Classes/IterationHelper';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataBrowserWindow } from '../../../Shared/scripts/Interfaces/IDataBrowserWindow';
import { IDataOneIframe } from '../../../Shared/scripts/Interfaces/IDataOneIframe';
import { IScVerSpec } from '../../../Shared/scripts/Interfaces/IScVerSpec';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';

export class PromiseGeneric extends ContentManagerBase {
  constructor(xyyz: ContentHub) {
    super(xyyz)
    xyyz.debug.FuncStart(PromiseGeneric.name);
    xyyz.debug.FuncEnd(PromiseGeneric.name);
  }

  async  WaitForReadyIframe(dataOneIframe: IDataOneIframe) {
    return new Promise<IDataOneIframe>(async (resolve) => {
      this.debug().FuncStart(this.WaitForReadyIframe.name, dataOneIframe.Nickname + ' ' + dataOneIframe.Id.AsShort);

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
          dataOneIframe.ContentDoc = this.Factoryman().DataOneContentDocFactoryFromIframe(dataOneIframe.IframeElem, dataOneIframe.ContentDoc.ParentDoc,
            dataOneIframe.Nickname);
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
            iframeData = this.Factoryman().DateOneIframeFactory(<HTMLIFrameElement>foundElem, targetDoc, nickname)
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
      let iterationJr = new IterationHelper(this.Xyyz, this.WaitForThenClick.name, 5);
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

      await this.PromiseGen().WaitForThenClick([selector], targetDoc)
        .then(() => resolve(payload))
        .catch(ex => {
          this.debug().Error(this.WaitForAndClickWithPayload.name, ex);
          reject(ex);
        });
    });
  }

  async SetHrefAndWaitForReady(href, targetWindow: IDataBrowserWindow, targetWindowType: scWindowType) {
    return new Promise(async (resolve, reject) => {
      this.debug().FuncStart(this.SetHrefAndWaitForReady.name, href);

      var isCorrectHref = targetWindow.Window.location.href = href;

      if (targetWindow.WindowType !== targetWindowType) {
        targetWindow.Window.location.href = href;
      }

      await this.WaitForPageReadyNative(targetWindow)
        .then(() => resolve())
        .catch(() => reject());

      this.debug().FuncEnd(this.SetHrefAndWaitForReady.name);
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

  async WaitForPageReady(targetWindow: IDataBrowserWindow) {
      return new Promise<void>(async (resolve, reject) => {
        this.debug().FuncStart(this.WaitForPageReady.name);

        this.debug().DebugIDataBrowserWindow(targetWindow);

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

  async RaceWaitAndClick(selector: IScVerSpec, targetDoc: IDataOneDoc) {
      return new Promise(async (resolve, reject) => {
        this.debug().FuncStart(this.RaceWaitAndClick.name);

        var raceFlag: boolean = false;

        var prom1 = this.WaitForThenClick([selector.sc920, selector.sc820], targetDoc);

        this.debug().FuncEnd(this.RaceWaitAndClick.name);
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
          this.debug().FuncStart(this.WaitForThenClick.name, selector.length);

          var found: HTMLElement = null;

          var iterationJr = new IterationHelper(this.Xyyz, this.WaitForThenClick.name);

          while (!found && iterationJr.DecrementAndKeepGoing() && !this.MsgMan().OperationCancelled) {
            for (var idx = 0; idx < selector.length; idx++) {
              found = targetDoc.Document.querySelector(selector[idx]);
              if (found) {
                break;
              }
            }

            if (found) {
              this.debug().Log('found and clicking');
              found.click();

              this.debug().FuncEnd(this.WaitForThenClick.name, selector.length);
              resolve();
            } else {
              await iterationJr.Wait()
            }
          }
        } else {
          reject();
        }

        this.debug().FuncEnd(this.WaitForThenClick.name, selector.length);
        if (!found && iterationJr.IsExhausted) {
          reject('exhausted');
        }
      });
    }
}