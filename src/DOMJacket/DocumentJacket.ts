import { IterationDrone } from "../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ReadyStateNAB } from "../Shared/scripts/Enums/ReadyState";
import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from "../Shared/scripts/Interfaces/InjectConst";
import { IScVerSpec } from "../Shared/scripts/Interfaces/IScVerSpec";
import { FrameJacket } from "./FrameJacket";
import { ElementJacket } from "./ElementJacket";
import { CEFrameProxy } from "../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";
import { FactoryHelper } from "../Shared/scripts/Helpers/FactoryHelper";
import { _HindeCoreBase } from "../Shared/scripts/LoggableBase";
import { UrlJacket } from "./UrlJacket";
import { SharedConst } from "../Shared/scripts/SharedConst";
import { IAbsoluteUrl } from "../Shared/scripts/Interfaces/IAbsoluteUrl";
import { Guid } from "../Shared/scripts/Helpers/Guid";
import { GuidData } from "../Shared/scripts/Helpers/GuidData";
import { PromiseFailAction } from "../Shared/scripts/Enums/PromiseFailAction";

export class DocumentJacket extends _HindeCoreBase {
  private NativeDocument: Document;
  public readonly UrlJacket: UrlJacket;
  readonly DocId: GuidData = Guid.NewRandomGuid();

  constructor(hindeCore: IHindeCore, nativeDocument: Document) {
    super(hindeCore);
    this.NativeDocument = nativeDocument;
    this.UrlJacket = new UrlJacket(this.HindeCore, nativeDocument.URL);
  }

  GetElementById(idStr: string): ElementJacket {
    let elementJacket: ElementJacket = null;
    let htmlElement: HTMLElement = this.NativeDocument.getElementById(idStr);
    if (htmlElement) {
      elementJacket = new ElementJacket(this.HindeCore, htmlElement);
    }
    return elementJacket;
  }

  QuerySelector(selector: string): ElementJacket {
    let elementJacket: ElementJacket = null;
    let htmlElement: HTMLElement = this.NativeDocument.querySelector(selector);
    if (htmlElement) {
      elementJacket = new ElementJacket(this.HindeCore, htmlElement);
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
      toReturn = new DocumentJacket(this.HindeCore, thisParent);
    }

    this.Logger.FuncEnd(this.GetParentJacket.name);
    return toReturn;
  }

  GetHostedFramesFilteredBySelectorFirst(querySelector: string): FrameJacket {
    this.Logger.FuncStart(this.GetHostedFramesFilteredBySelectorFirst.name, querySelector);
    let firstFrameJacket: FrameJacket = null;

    let matchingJackets: FrameJacket[] = this.GetHostedFramesFilteredBySelector(querySelector);
    if (matchingJackets && matchingJackets.length > 0) {
      firstFrameJacket = matchingJackets[0];
    }

    this.Logger.FuncEnd(this.GetHostedFramesFilteredBySelectorFirst.name, querySelector);
    return firstFrameJacket;
  }

  GetHostedFramesFilteredBySelector(querySelector: string): FrameJacket[] {
    this.Logger.FuncStart(this.GetHostedFramesFilteredBySelector.name, querySelector);
    let frameJackets: FrameJacket[] = [];

    this.ErrorHand.ThrowIfNullOrUndefined(this.GetHostedFramesFilteredBySelector.name, [this.NativeDocument]);

    var queryResultIframes: NodeList = this.NativeDocument.querySelectorAll('iframe');
    this.Logger.LogVal('found iframes', queryResultIframes.length);
    let filteredList: NodeList = this.NativeDocument.querySelectorAll('iframe' + querySelector);
    this.Logger.LogVal('found filtered iframes', filteredList.length);

    if (filteredList && filteredList.length > 0) {
      filteredList.forEach((iframeNode: Node) => {
        let candidate: FrameJacket = new FrameJacket(this.HindeCore, <HTMLIFrameElement>iframeNode);
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

  GetHostedFrameJackets(): FrameJacket[] {
    let frameJackets: FrameJacket[] = [];

    this.ErrorHand.ThrowIfNullOrUndefined(this.GetHostedFrameJackets.name, [this.NativeDocument]);

    var queryResults = this.NativeDocument.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc920);

    if (!queryResults) {
      queryResults = this.NativeDocument.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc820);
    }

    if (queryResults) {
      for (var ifrIdx = 0; ifrIdx < queryResults.length; ifrIdx++) {
        var frameJacket: FrameJacket = new FrameJacket(this.HindeCore, <HTMLIFrameElement>queryResults[ifrIdx]);
        if (frameJacket) {
          frameJackets.push(frameJacket);
        }
      }
    }

    this.Logger.LogVal('found iframes count', frameJackets.length);

    return frameJackets;
  }

  Validate() {
    let url: IAbsoluteUrl = this.UrlJacket.BuildFullUrlFromParts();

    if (!url) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, 'No URL');
    }
    else if (url.AbsUrl === SharedConst.Const.UrlSuffix.AboutBlank) {
      this.ErrorHand.ErrorAndThrow(this.Validate.name, SharedConst.Const.UrlSuffix.AboutBlank + ' not allowed');
    }
  }
  async WaitForIframeElemAndReturnCEFrameProxyWhenReady(selector: string, iframeNickName: string): Promise<CEFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForIframeElemAndReturnCEFrameProxyWhenReady.name);

      let factoryHelp = new FactoryHelper(this.HindeCore);

      let frameJacket: FrameJacket = null;

      await this.WaitForAndReturnFoundElemJacketFromDoc(selector)
        .then(async (foundElem: ElementJacket) => frameJacket = new FrameJacket(this.HindeCore, <HTMLIFrameElement>foundElem.NativeElement))
        .then(() => factoryHelp.CEFrameFactory(frameJacket, iframeNickName))
        .then((result: CEFrameProxy) => resolve(result))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.WaitForIframeElemAndReturnCEFrameProxyWhenReady.name);
    });
  }

  public async WaitForAndReturnFoundElemJacketFromDoc(selector: string, promiseFailAction: PromiseFailAction = PromiseFailAction.Default): Promise<ElementJacket> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForAndReturnFoundElemJacketFromDoc.name, selector);

      var toReturnFoundElem: HTMLElement = null;
      var iterationJr = new IterationDrone(this.HindeCore, this.WaitForAndReturnFoundElemJacketFromDoc.name + ' - ' + selector, true);

      while (!toReturnFoundElem && iterationJr.DecrementAndKeepGoing()) {
        toReturnFoundElem = this.NativeDocument.querySelector(selector);
        if (toReturnFoundElem) {
          this.Logger.Log('found it');
          resolve(new ElementJacket(this.HindeCore, toReturnFoundElem));
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
      this.Logger.FuncEnd(this.WaitForAndReturnFoundElemJacketFromDoc.name, selector);
    });
  }
  public WaitForThenClick(selectorAr: string[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForThenClick.name, [selectorAr, this.NativeDocument]);

      var foundHtmlElement: HTMLElement = null;
      var iterationJr = new IterationDrone(this.HindeCore, this.WaitForThenClick.name + ' | ' + JSON.stringify(selectorAr), true);
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

  public async WaitForCompleteNAB_NativeDocument(friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNAB_NativeDocument.name, friendly);
      this.Logger.LogVal('url', this.NativeDocument.URL);
      this.Logger.LogVal('readyState', this.NativeDocument.readyState);

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForCompleteNAB_NativeDocument.name, this.NativeDocument);

      var iterationJr: IterationDrone = new IterationDrone(this.HindeCore, this.WaitForCompleteNAB_NativeDocument.name, false);
      let readyStateNAB: ReadyStateNAB = new ReadyStateNAB(this.HindeCore, this.NativeDocument);

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

      this.Logger.FuncEnd(this.WaitForCompleteNAB_NativeDocument.name, friendly);
    });
  }
}