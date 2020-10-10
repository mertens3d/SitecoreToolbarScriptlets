/// <reference path="../../../node_modules/web-ext-types/global/index.d.ts" />

import { DocumentJacket } from '../../DOMJacket/DocumentJacket';
import { IterationDrone } from '../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { ReadyStateNAB } from '../../Shared/scripts/Classes/ReadyState';
import { IAPICore } from '../../Shared/scripts/Interfaces/Agents/IAPICore';
import { IRecipeBasics } from '../../Shared/scripts/Interfaces/IPromiseHelper';
import { _APICoreBase } from '../../Shared/scripts/_APICoreBase';
import { FrameHelper } from './Helpers/FrameHelper';
import { DTFrameProxy } from './Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';

export class RecipeBasics extends _APICoreBase implements IRecipeBasics {
  constructor(apiCore: IAPICore) {
    super(apiCore);
  }

  WaitForNoUiFrontOverlay(friendly: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNoUiFrontOverlay.name, friendly);
      var iterationJr: IterationDrone = new IterationDrone(this.ApiCore, this.WaitForNoUiFrontOverlay.name, true);

      let overLayExists: boolean = true;

      let iframeElem: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById('jqueryModalDialogsFrame');
      let iframeContentDoc: Document = iframeElem.contentDocument;
      let iframeContentDocBody: HTMLBodyElement = <HTMLBodyElement>iframeContentDoc.body;

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

  WaitForTimePeriod(timeToWaitMs: number, friendly: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForTimePeriod.name, friendly);
      var iterationJr: IterationDrone = new IterationDrone(this.ApiCore, this.WaitForTimePeriod.name, true);

      let startTimeStamp: number = new Date().getTime();
      let timeElapsed: number = 0;

      while (iterationJr.DecrementAndKeepGoing() && timeElapsed < timeToWaitMs) {
        timeElapsed = new Date().getTime() - startTimeStamp;
        await iterationJr.Wait();
      }
      resolve();

      this.Logger.FuncEnd(this.WaitForTimePeriod.name, friendly);
    });
  }

  async WaitForCompleteNAB_DataOneDoc(documentJacket: DocumentJacket, friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNAB_DataOneDoc.name, friendly);

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForCompleteNAB_DataOneDoc.name, [documentJacket, friendly]);

      await documentJacket.WaitForCompleteNAB_DocumentJacket(friendly)// this.WaitForCompleteNABDocumentNative(targetDoc.ContentDoc, friendly)
        .then((result: ReadyStateNAB) => {
          result.LogDebugValues();
          resolve(result);
        })
        .catch((err) => reject(this.WaitForCompleteNAB_DataOneDoc.name + ' | ' + err));

      this.Logger.FuncEnd(this.WaitForCompleteNAB_DataOneDoc.name, friendly);
    });
  }

  async GetTopLevelIframe(documentJacket: DocumentJacket): Promise<DTFrameProxy> {
    var toReturn: DTFrameProxy = null;
    let frameHelper = new FrameHelper(this.ApiCore);
    await frameHelper.GetIFramesAsBaseFrameProxies(documentJacket)
      .then((allIframe: DTFrameProxy[]) => {
        var maxZVal = -1;
        if (allIframe && allIframe.length > 0) {
          for (var idx = 0; idx < allIframe.length; idx++) {
            var candidateIframe: DTFrameProxy = allIframe[idx];
            if (candidateIframe && candidateIframe.GetZindexAsInt() > maxZVal) {
              toReturn = candidateIframe;
              maxZVal = candidateIframe.GetZindexAsInt();
            }
          }
        }
      })
    return toReturn;
  }

  //async WaitForNewIframeContentEditor(allIframesBefore: HTMLIFrameElement[], targetDoc: ScDocumentProxy): Promise<DTFrameProxy> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.WaitForNewIframe.name);
  //    let toReturn: DTFrameProxy = null;

  //    await this.WaitForNewIframeNative(allIframesBefore, targetDoc)
  //      .then((result: HTMLIFrameElement) => {
  //        toReturn = new DTFrameProxy(this.ApiCore, result);
  //      })
  //      .then(() => resolve(toReturn))
  //      .catch((err) => reject(this.WaitForNewIframeContentEditor.name + ' | ' + err));

  //    this.Logger.FuncEnd(this.WaitForNewIframe.name);
  //  });
  //}

  //async WaitForNewIframeNative(allIframesBefore: HTMLIFrameElement[], dateOneDoc: ScDocumentProxy): Promise<HTMLIFrameElement> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.WaitForNewIframeNative.name);
  //    this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, [allIframesBefore, dateOneDoc]);

  //    var toReturn: HTMLIFrameElement = null;

  //    var iterationJr = new IterationDrone(this.ApiCore, this.WaitForNewIframeNative.name, true)
  //    let beforeCount: number = allIframesBefore.length;

  //    while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
  //      var allIframesAfter: NativeScIframeProxy[];

  //      let frameHelper = new FrameHelper(this.ApiCore);

  //      allIframesAfter = dateOneDoc.GetIFramesFromDataOneDoc();

  //      var count: number = allIframesAfter.length;

  //      if (count > beforeCount) {
  //        var newIframes: HTMLIFrameElement[] = allIframesAfter.filter(e => !allIframesBefore.includes(e));

  //        toReturn = newIframes[0];
  //        resolve(toReturn);
  //      } else {
  //        await iterationJr.Wait();
  //      }
  //    }

  //    reject('probably ' + iterationJr.IsExhaustedMsg);

  //    this.Logger.FuncEnd(this.WaitForNewIframeNative.name);
  //  });
  //}

  async WaitForNewIframe(allIframesBefore: DTFrameProxy[], documentJacket: DocumentJacket): Promise<DTFrameProxy> {
    return new Promise<DTFrameProxy>(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForNewIframe.name);
      this.Logger.LogAsJsonPretty('allIframesBefore', allIframesBefore);

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForNewIframe.name, [allIframesBefore, documentJacket]);

      var toReturn: DTFrameProxy = null;

      var iterationJr = new IterationDrone(this.ApiCore, this.WaitForNewIframe.name, true)
      let beforeCount: number = allIframesBefore.length;

      while (!toReturn && iterationJr.DecrementAndKeepGoing()) {
        var allIframesAfter: DTFrameProxy[];

        let frameHelper = new FrameHelper(this.ApiCore);

        await frameHelper.GetIFramesAsBaseFrameProxies(documentJacket)
          .then((result) => allIframesAfter = result)
          .catch((err) => reject(this.WaitForNewIframe.name + ' ' + err));

        var count: number = allIframesAfter.length;
        this.Logger.Log('iFrame count before: ' + beforeCount);
        this.Logger.Log('iFrame count after: ' + allIframesAfter.length);

        if (count > beforeCount) {
          var newIframes: DTFrameProxy[] = allIframesAfter.filter(e => !allIframesBefore.includes(e));

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

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForElemToHaveClassOrReject.name, [htmlElement, classNames]);
      var elemHasClassName: boolean = false;
      var iterationJr = new IterationDrone(this.ApiCore, this.WaitForElemToHaveClassOrReject.name + ' : ' + classNames + ' ' + friendly, true);

      while (!elemHasClassName && iterationJr.DecrementAndKeepGoing()) {
        let classList = htmlElement.classList;

        classNames.forEach((className: string) => {
          if (classList.contains(className)) {
            elemHasClassName = true;
          }
        })

        if (elemHasClassName) {
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
      this.Logger.FuncStart(this.WaitAndReturnFoundFromContainer.name, selector);
      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitAndReturnFoundFromContainer.name, [haystackElem, selector]);
      var toReturnFoundElem: HTMLElement = null;
      var iterationJr = new IterationDrone(this.ApiCore, this.WaitAndReturnFoundFromContainer.name + ' : ' + selector + ' ' + friendly, true);

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
      this.Logger.FuncEnd(this.WaitAndReturnFoundFromContainer.name, selector);
    });
  }
}