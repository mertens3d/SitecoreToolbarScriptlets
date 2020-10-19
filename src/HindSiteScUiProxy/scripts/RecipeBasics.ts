/// <reference path="../../../node_modules/web-ext-types/global/index.d.ts" />

import { DocumentJacket } from '../../DOMJacket/Document/DocumentJacket';
import { IterationDrone } from '../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
import { ReadyStateNAB } from "../../Shared/scripts/Classes/ReadyStateNAB";
import { IAPICore } from '../../Shared/scripts/Interfaces/Agents/IAPICore';
import { IRecipeBasics } from '../../Shared/scripts/Interfaces/IPromiseHelper';
import { _APICoreBase } from '../../Shared/scripts/_APICoreBase';

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