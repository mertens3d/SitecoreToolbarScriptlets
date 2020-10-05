import { IterationDrone } from "../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ReadyStateNAB } from "../Shared/scripts/Enums/ReadyState";
import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from "../Shared/scripts/Interfaces/InjectConst";
import { IScVerSpec } from "../Shared/scripts/Interfaces/IScVerSpec";
import { FrameJacket } from "./FrameJacket";
import { CEFrameProxy } from "../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";
import { FactoryHelper } from "../Shared/scripts/Helpers/FactoryHelper";
import { _HindeCoreBase } from "../Shared/scripts/LoggableBase";
import { UrlJacket } from "./GenericUrlAgent";
import { SharedConst } from "../Shared/scripts/SharedConst";
import { IAbsoluteUrl } from "../Shared/scripts/Interfaces/IAbsoluteUrl";

export class DocumentJacket extends _HindeCoreBase {
  private NativeDocument: Document;
  public readonly UrlJacket: UrlJacket;

  constructor(hindeCore: IHindeCore, nativeDocument: Document) {
    super(hindeCore);
    this.NativeDocument = nativeDocument;
    this.UrlJacket = new UrlJacket(this.HindeCore, nativeDocument.URL);
  }

  getElementById(idStr: string): HTMLElement {
    return this.NativeDocument.getElementById(idStr);
  }

  querySelector(selector: string): HTMLElement {
    return this.NativeDocument.querySelector(selector);
  }

  GetContentDoc(): Document {
    return this.NativeDocument;
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

      await this.WaitForAndReturnFoundElem(selector)
        .then(async (foundElem: HTMLIFrameElement) => frameJacket = new FrameJacket(this.HindeCore, foundElem))
        .then(() => factoryHelp.CEFrameFactory(frameJacket, iframeNickName))
        .then((result: CEFrameProxy) => resolve(result))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.WaitForIframeElemAndReturnCEFrameProxyWhenReady.name);
    });
  }

  public async WaitForAndReturnFoundElem(selector: string, overrideIterCount = 8): Promise<HTMLElement> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForAndReturnFoundElem.name, selector);

      var toReturnFoundElem: HTMLElement = null;
      var iterationJr = new IterationDrone(this.HindeCore, this.WaitForAndReturnFoundElem.name + ' - ' + selector, true, overrideIterCount);

      while (!toReturnFoundElem && iterationJr.DecrementAndKeepGoing()) {
        toReturnFoundElem = this.NativeDocument.querySelector(selector);
        if (toReturnFoundElem) {
          this.Logger.Log('found it');
          resolve(toReturnFoundElem);
        }
        else {
          await iterationJr.Wait();
        }
      }

      reject(iterationJr.IsExhaustedMsg);
      this.Logger.FuncEnd(this.WaitForAndReturnFoundElem.name, selector);
    });
  }
  public WaitForThenClick(selectorAr: string[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForThenClick.name, [selectorAr, this.NativeDocument]);

      var found: HTMLElement = null;
      var iterationJr = new IterationDrone(this.HindeCore, this.WaitForThenClick.name, true);

      while (!found && iterationJr.DecrementAndKeepGoing()) { // todo put back && !this.MsgMan().OperationCancelled) {
        for (var idx = 0; idx < selectorAr.length; idx++) {
          found = this.NativeDocument.querySelector(selectorAr[idx]);
          if (found) {
            break;
          }
        }
      }

      if (found) {
        try {
          this.Logger.LogAsJsonPretty(this.WaitForThenClick.name + ' clicking', selectorAr);
          found.click();
          resolve();
        }
        catch (err) {
          reject(this.WaitForThenClick.name + ' | ' + err);
        }
      }
      else {
        await iterationJr.Wait()
          .catch((err) => reject(this.WaitForThenClick.name + ' | ' + err));
      }

      if (!found && iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
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