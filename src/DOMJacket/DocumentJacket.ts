﻿import { IterationDrone } from "../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ReadyStateNAB } from "../Shared/scripts/Classes/ReadyState";
import { ICommonCore } from "../Shared/scripts/Interfaces/Agents/ICommonCore";
import { ContentConst } from "../Shared/scripts/Interfaces/InjectConst";
import { IScVerSpec } from "../Shared/scripts/Interfaces/IScVerSpec";
import { ElementFrameJacket } from "./ElementFrameJacket";
import { ElementJacket } from "./ElementJacket";
import { CEFrameProxy } from "../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";
import { FactoryHelper } from "../HindSiteScUiProxy/scripts/FactoryHelper";
import { UrlJacket } from "./UrlJacket";
import { SharedConst } from "../Shared/scripts/SharedConst";
import { ISiteUrl } from "../Shared/scripts/Interfaces/IAbsoluteUrl";
import { Guid } from "../Shared/scripts/Helpers/Guid";
import { GuidData } from "../Shared/scripts/Helpers/GuidData";
import { PromiseFailAction } from "../Shared/scripts/Enums/PromiseFailAction";
import { StaticHelpers } from "../Shared/scripts/Classes/StaticHelpers";
import { _CommonBase } from "../Shared/scripts/_CommonCoreBase";

export class DocumentJacket extends _CommonBase {
  private NativeDocument: Document;
  public readonly UrlJacket: UrlJacket;
  readonly DocId: GuidData = Guid.NewRandomGuid();

  constructor(commonCore: ICommonCore, nativeDocument: Document) {
    super(commonCore);
    this.NativeDocument = nativeDocument;
    this.UrlJacket = new UrlJacket(this.CommonCore, nativeDocument.URL);
  }

  GetElementById(idStr: string): ElementJacket {
    let elementJacket: ElementJacket = null;
    let htmlElement: HTMLElement = this.NativeDocument.getElementById(idStr);
    if (htmlElement) {
      elementJacket = new ElementJacket(this.CommonCore, htmlElement);
    }
    return elementJacket;
  }

  QuerySelector(selector: string): ElementJacket {
    let elementJacket: ElementJacket = null;
    let htmlElement: HTMLElement = this.NativeDocument.querySelector(selector);
    if (htmlElement) {
      elementJacket = new ElementJacket(this.CommonCore, htmlElement);
    }
    return elementJacket;
  }

  GetContentDoc(): Document {
    return this.NativeDocument;
  }

  GetParentJacket(): DocumentJacket {
    this.Logger.FuncStart(this.GetParentJacket.name);
    let toReturn: DocumentJacket = null;

    let thisParent: Document = parent.document;
    if (thisParent) {
      toReturn = new DocumentJacket(this.CommonCore, thisParent);
    }

    this.Logger.FuncEnd(this.GetParentJacket.name);
    return toReturn;
  }

  async WaitForFirstHostedFrame(querySelector: string): Promise<ElementFrameJacket> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForFirstHostedFrame.name, querySelector);
      let firstFrameJacket: ElementFrameJacket = null;

      await this.WaitForElem(querySelector)
        .then((elemJacket: ElementJacket) => resolve(new ElementFrameJacket(this.CommonCore, <HTMLIFrameElement>elemJacket.NativeElement)))
        .catch((err) => reject(this.ErrorHand.FormatejectMessage([this.WaitForFirstHostedFrame.name], err)));

      //  let matchingJackets: FrameJacket[] = this.GetHostedFramesFilteredBySelector(querySelector);
      //if (matchingJackets && matchingJackets.length > 0) {
      //  firstFrameJacket = matchingJackets[0];
      //}

      this.Logger.FuncEnd(this.WaitForFirstHostedFrame.name, querySelector);
    })
  }

  GetHostedFramesFilteredBySelector(querySelector: string): ElementFrameJacket[] {
    this.Logger.FuncStart(this.GetHostedFramesFilteredBySelector.name, querySelector);
    let frameJackets: ElementFrameJacket[] = [];

    this.ErrorHand.ThrowIfNullOrUndefined(this.GetHostedFramesFilteredBySelector.name, [this.NativeDocument]);

    var queryResultIframes: NodeList = this.NativeDocument.querySelectorAll('iframe');
    this.Logger.LogVal('found iframes', queryResultIframes.length);
    let filteredList: NodeList = this.NativeDocument.querySelectorAll('iframe' + querySelector);
    this.Logger.LogVal('found filtered iframes', filteredList.length);

    if (filteredList && filteredList.length > 0) {
      filteredList.forEach((iframeNode: Node) => {
        let candidate: ElementFrameJacket = new ElementFrameJacket(this.CommonCore, <HTMLIFrameElement>iframeNode);
        if (candidate) {
          frameJackets.push(candidate);
        } else {
          this.Logger.Log('one of the iframes did not work');
        }
      });
    }
    this.Logger.FuncEnd(this.GetHostedFramesFilteredBySelector.name, querySelector);
    return frameJackets;
  }

  GetHostedFrameJackets(): ElementFrameJacket[] {
    let frameJackets: ElementFrameJacket[] = [];

    this.ErrorHand.ThrowIfNullOrUndefined(this.GetHostedFrameJackets.name, [this.NativeDocument]);

    var queryResults = this.NativeDocument.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc920);

    if (!queryResults) {
      queryResults = this.NativeDocument.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc820);
    }

    if (queryResults) {
      for (var ifrIdx = 0; ifrIdx < queryResults.length; ifrIdx++) {
        var frameJacket: ElementFrameJacket = new ElementFrameJacket(this.CommonCore, <HTMLIFrameElement>queryResults[ifrIdx]);
        if (frameJacket) {
          frameJackets.push(frameJacket);
        }
      }
    }

    this.Logger.LogVal('found iframes count', frameJackets.length);

    return frameJackets;
  }

  Validate() {
    let url: ISiteUrl = this.UrlJacket.BuildFullUrlFromParts();

    if (!url) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, 'No URL');
    }
    else if (url.AbsUrl === SharedConst.Const.UrlSuffix.AboutBlank) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, SharedConst.Const.UrlSuffix.AboutBlank + ' not allowed');
    }
  }


  public async WaitForElem(selector: string, promiseFailAction: PromiseFailAction = PromiseFailAction.Default): Promise<ElementJacket> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForElem.name, selector);

      var toReturnFoundElem: HTMLElement = null;
      var iterationJr = new IterationDrone(this.CommonCore, this.WaitForElem.name + ' - selector: "' + selector + '"', true);
      let firstFind = true;

      while (!toReturnFoundElem && iterationJr.DecrementAndKeepGoing()) {
        toReturnFoundElem = this.NativeDocument.querySelector(selector);

        if (toReturnFoundElem && !StaticHelpers.IsNullOrUndefined(toReturnFoundElem)) {
          if (firstFind) {
            toReturnFoundElem = null;
            firstFind = false;
          } else {
            this.Logger.Log('found it');
            let elemJacket: ElementJacket = new ElementJacket(this.CommonCore, toReturnFoundElem);
            this.Logger.LogAsJsonPretty('found', elemJacket);
            resolve(elemJacket);
          }
        }
        else {
          await iterationJr.Wait();
        }
      }

      if (promiseFailAction === PromiseFailAction.Default || promiseFailAction == PromiseFailAction.RejectThrow) {
        reject(iterationJr.IsExhaustedMsg);
      } else if (promiseFailAction === PromiseFailAction.ResolveNull) {
        resolve(null);
      }
      this.Logger.FuncEnd(this.WaitForElem.name, selector);
    });
  }

  public WaitForThenClick(selectorAr: string[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      // todo - maybe just get the body element and then use the elementjacket methods to find the target elem

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForThenClick.name, [selectorAr, this.NativeDocument]);

      var foundHtmlElement: HTMLElement = null;
      var iterationJr = new IterationDrone(this.CommonCore, this.WaitForThenClick.name + ' | ' + JSON.stringify(selectorAr), true);
      let foundSelector: string = '';


      while (!foundHtmlElement && iterationJr.DecrementAndKeepGoing()) { // todo put back && !this.MsgMan().OperationCancelled) {
        for (var idx = 0; idx < selectorAr.length; idx++) {
          foundSelector = selectorAr[idx];
          foundHtmlElement = this.NativeDocument.querySelector(foundSelector);

          if (foundHtmlElement) {
            break;
          }
        }
        await iterationJr.Wait();
      }

      if (foundHtmlElement) {
        try {
          this.Logger.LogAsJsonPretty(this.WaitForThenClick.name + ' clicking', foundSelector);
          foundHtmlElement.click();
          resolve();
        }
        catch (err) {
          reject(this.WaitForThenClick.name + ' | ' + err);
        }
      } else {
        if (!foundHtmlElement && iterationJr.IsExhausted) {
          reject(iterationJr.IsExhaustedMsg);
        } else {
          reject('unknown reason');
        }
      }
    });
  }

  async RaceWaitAndClick(selector: IScVerSpec): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.WaitForThenClick([selector.sc920, selector.sc820])
        .then(() => resolve())
        .catch((err) => reject(this.RaceWaitAndClick.name + ' | ' + err));
    });
  }

  WaitForAndClickWithPayload(selector: string, payload: any) {
    return new Promise<any>(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForAndClickWithPayload.name, selector);

      await this.WaitForThenClick([selector])
        .then(() => resolve(payload))
        .catch(ex => {
          this.ErrorHand.ErrorAndThrow(this.WaitForAndClickWithPayload.name, ex);
          reject(ex);
        });
    });
  }

  public async WaitForCompleteNAB_DocumentJacket(friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNAB_DocumentJacket.name, friendly);
      this.Logger.LogVal('url', this.NativeDocument.URL);
      this.Logger.LogVal('readyState', this.NativeDocument.readyState);

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForCompleteNAB_DocumentJacket.name, this.NativeDocument);

      var iterationJr: IterationDrone = new IterationDrone(this.CommonCore, this.WaitForCompleteNAB_DocumentJacket.name, false);
      let readyStateNAB: ReadyStateNAB = new ReadyStateNAB(this.CommonCore, this.NativeDocument);

      while (iterationJr.DecrementAndKeepGoing() && !readyStateNAB.IsCompleteNAB()) {
        readyStateNAB.LogDebugValues();
        await iterationJr.Wait();
      }

      if (iterationJr.IsExhausted) {
        this.Logger.Log(iterationJr.IsExhaustedMsg);
        reject(iterationJr.IsExhaustedMsg);
      }
      else {
        resolve(readyStateNAB);
      }

      this.Logger.FuncEnd(this.WaitForCompleteNAB_DocumentJacket.name, friendly);
    });
  }
}