///// <reference path="../../../node_modules/web-ext-types/global/index.d.ts" />

//import { DocumentJacket } from '../../DOMJacket/scripts/Document/DocumentJacket';
//import { IterationDrone } from '../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone';
//import { ReadyStateNAB } from "../../Shared/scripts/Classes/ReadyStateNAB";
//import { IAPICore } from '../../Shared/scripts/Interfaces/Agents/IAPICore';
//import { IRecipeBasics } from '../../Shared/scripts/Interfaces/IPromiseHelper';
//import { _APICoreBase } from '../../Shared/scripts/_APICoreBase';

//export class RecipeBasics extends _APICoreBase implements IRecipeBasics {
//  constructor(apiCore: IAPICore) {
//    super(apiCore);
//  }




//  async WaitForCompleteNAB_DataOneDoc(documentJacket: DocumentJacket, friendly: string): Promise<ReadyStateNAB> {
//    return new Promise(async (resolve, reject) => {
//      this.Logger.FuncStart(this.WaitForCompleteNAB_DataOneDoc.name, friendly);

//      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForCompleteNAB_DataOneDoc.name, [documentJacket, friendly]);

//      await documentJacket.WaitForCompleteNAB_DocumentJacket(friendly)// this.WaitForCompleteNABDocumentNative(targetDoc.ContentDoc, friendly)
//        .then((result: ReadyStateNAB) => {
//          result.LogDebugValues();
//          resolve(result);
//        })
//        .catch((err: any) => reject(this.WaitForCompleteNAB_DataOneDoc.name + ' | ' + err));

//      this.Logger.FuncEnd(this.WaitForCompleteNAB_DataOneDoc.name, friendly);
//    });
//  }


//  async WaitAndReturnFoundFromContainer(haystackElem: HTMLElement, selector: string, friendly: string): Promise<HTMLElement> {
//    return new Promise(async (resolve, reject) => {
//      this.Logger.FuncStart(this.WaitAndReturnFoundFromContainer.name, selector);
//      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitAndReturnFoundFromContainer.name, [haystackElem, selector]);
//      var toReturnFoundElem: HTMLElement = null;
//      var iterationJr = new IterationDrone(this.ApiCore, this.WaitAndReturnFoundFromContainer.name + ' : ' + selector + ' ' + friendly, true);

//      while (!toReturnFoundElem && iterationJr.DecrementAndKeepGoing()) {
//        toReturnFoundElem = haystackElem.querySelector(selector);
//        if (toReturnFoundElem) {
//          resolve(toReturnFoundElem)
//        } else {
//          await iterationJr.Wait();
//        }
//      }

//      if (iterationJr.IsExhausted) {
//        reject(iterationJr.IsExhaustedMsg);
//      }
//      this.Logger.FuncEnd(this.WaitAndReturnFoundFromContainer.name, selector);
//    });
//  }
//}