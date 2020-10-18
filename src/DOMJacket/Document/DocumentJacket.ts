import { IterationDrone } from "../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ReadyStateNAB } from "../../Shared/scripts/Classes/ReadyStateNAB";
import { StaticHelpers } from "../../Shared/scripts/Classes/StaticHelpers";
import { PromiseFailAction } from "../../Shared/scripts/Enums/PromiseFailAction";
import { Guid } from "../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../Shared/scripts/Helpers/GuidData";
import { ICommonCore } from "../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { ISiteUrl } from "../../Shared/scripts/Interfaces/IAbsoluteUrl";
import { ContentConst } from "../../Shared/scripts/Interfaces/InjectConst";
import { IScVerSpec } from "../../Shared/scripts/Interfaces/IScVerSpec";
import { SharedConst } from "../../Shared/scripts/SharedConst";
import { _CommonBase } from "../../Shared/scripts/_CommonCoreBase";
import { GenericElemJacket } from "../Elements/GenericElemJacket";
import { FrameElemJacket } from "../Elements/FrameElemJacket";
import { UrlJacket } from "../UrlJacket";

export class DocumentJacket extends _CommonBase {
  private NativeDocument: Document;
  public UrlJacket: UrlJacket = null;
  readonly DocId: GuidData = Guid.NewRandomGuid();
  private LastKnownReadyStateNAB: ReadyStateNAB = null;

  private constructor(commonCore: ICommonCore, nativeDocument: Document) {
    super(commonCore);
    this.Logger.CTORStart(DocumentJacket.name);
    this.NativeDocument = nativeDocument;
    this.Instantiate();
    this.Logger.FuncEnd(DocumentJacket.name);
  }

  private Instantiate() {
    //empty
  }
  GetLastKnownReadyState(): ReadyStateNAB {
    return this.LastKnownReadyStateNAB
  }

  private async InstantiateSyncProperties(): Promise<void> {
    this.Logger.FuncStart([DocumentJacket.name, this.InstantiateSyncProperties.name]);
    try {
      this.UrlJacket = new UrlJacket(this.CommonCore, this.NativeDocument.URL);

      await this.WaitForCompleteNAB_DocumentJacket(DocumentJacket.name)
        .catch((err) => this.ErrorHand.HandleFatalError([DocumentJacket.name, this.InstantiateSyncProperties.name], err));
    } catch (err) {
      this.ErrorHand.HandleFatalError([DocumentJacket.name, this.InstantiateSyncProperties.name], err);
    }

    this.Logger.FuncEnd([DocumentJacket.name, this.InstantiateSyncProperties.name]);
  }

  public static async FactoryMakeDocumentJacket(commonCore: ICommonCore, nativeDocument: Document): Promise<DocumentJacket> {
    return new Promise(async (resolve, reject) => {
      commonCore.Logger.FuncStart(this.FactoryMakeDocumentJacket.name);

      let documentJacket: DocumentJacket = new DocumentJacket(commonCore, nativeDocument);

      await documentJacket.InstantiateSyncProperties()
        .then(() => resolve(documentJacket))
        .catch((err) => reject(commonCore.ErrorHand.FormatRejectMessage(this.FactoryMakeDocumentJacket.name, err)));

      commonCore.Logger.FuncEnd(this.FactoryMakeDocumentJacket.name);
    })
  }

  GetElementById(idStr: string): GenericElemJacket {
    let elementJacket: GenericElemJacket = null;
    let htmlElement: HTMLElement = this.NativeDocument.getElementById(idStr);
    if (htmlElement) {
      elementJacket = new GenericElemJacket(this.CommonCore, htmlElement);
    }
    return elementJacket;
  }

  QuerySelector(selector: string): GenericElemJacket {
    let elementJacket: GenericElemJacket = null;
    let htmlElement: HTMLElement = this.NativeDocument.querySelector(selector);
    if (htmlElement) {
      elementJacket = new GenericElemJacket(this.CommonCore, htmlElement);
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

  async WaitForFirstHostedFrame(querySelector: string): Promise<FrameElemJacket> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForFirstHostedFrame.name, querySelector);

      await this.WaitForGenericElemJacket(querySelector)
        .then((genericElemJacket: GenericElemJacket) => FrameElemJacket.FactoryFrameElemJackets(this.CommonCore, [genericElemJacket]))
        .then((frameElemJackets: FrameElemJacket[]) => resolve(frameElemJackets[0]))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([this.WaitForFirstHostedFrame.name], err)));

      this.Logger.FuncEnd(this.WaitForFirstHostedFrame.name, querySelector);
    })
  }

  async GetHostedFirstMatchingFrameElemJacket(querySelector: string): Promise<FrameElemJacket> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetHostedFirstMatchingFrameElemJacket.name, querySelector);
      let toReturnFrameElemJacket: FrameElemJacket = null;

      this.ErrorHand.ThrowIfNullOrUndefined(this.GetHostedFirstMatchingFrameElemJacket.name, [this.NativeDocument]);

      var queryResultIframes: NodeList = this.NativeDocument.querySelectorAll('iframe');
      this.Logger.LogVal('found iframes', queryResultIframes.length);
      let filteredList: NodeList = this.NativeDocument.querySelectorAll('iframe' + querySelector);

      this.Logger.LogVal('found filtered iframes', filteredList.length);

      let htmlElemAr: HTMLElement[] = [];
      let firstHtmlIframeElement: HTMLIFrameElement = null;

      if (filteredList && filteredList.length > 0) {
        firstHtmlIframeElement = <HTMLIFrameElement>filteredList[0];
        //filteredList.forEach((iframeNode: Node) => {
        //  htmlElemAr.push(<HTMLElement>iframeNode);
        //});
      }

      await FrameElemJacket.FactoryFrameElemJackets(this.CommonCore, [firstHtmlIframeElement])
        .then((frameElemJackets: FrameElemJacket[]) => toReturnFrameElemJacket = frameElemJackets[0])
        .then(() => resolve(toReturnFrameElemJacket))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([DocumentJacket.name, this.GetHostedFirstMatchingFrameElemJacket.name], err)));

      this.Logger.FuncEnd(this.GetHostedFirstMatchingFrameElemJacket.name, querySelector);
    });
  }

  private QueryResultNodeListToHtmlAr(queryResult: NodeList): HTMLElement[] {
    let htmlElements: HTMLElement[] = [];

    if (queryResult) {
      queryResult.forEach((result) => {
        htmlElements.push(<HTMLElement>result);
      })
    }

    return htmlElements;
  }

  GetHostedFrameJackets(): Promise<FrameElemJacket[]> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.GetHostedFrameJackets.name, [this.NativeDocument]);

      var queryResults = this.NativeDocument.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc920);

      if (!queryResults) {
        queryResults = this.NativeDocument.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc820);
      }

      let htmlElements: HTMLElement[] = this.QueryResultNodeListToHtmlAr(queryResults);

      await FrameElemJacket.FactoryFrameElemJackets(this.CommonCore, htmlElements)
        .then((frameElemJackets: FrameElemJacket[]) => resolve(frameElemJackets))
        .catch((err) => reject(this.ErrorHand.FormatRejectMessage([DocumentJacket.name, this.GetHostedFrameJackets.name], err)));
    });
  }

  Validate() {
    let url: ISiteUrl = this.UrlJacket.BuildFullUrlFromParts();

    if (!url) {
      this.ErrorHand.HandleFatalError(this.Validate.name, 'No URL');
    }
    else if (url.AbsUrl === SharedConst.Const.UrlSuffix.AboutBlank) {
      this.ErrorHand.HandleFatalError(this.Validate.name, SharedConst.Const.UrlSuffix.AboutBlank + ' not allowed');
    }
  }

  public async WaitForGenericElemJacket(selector: string, promiseFailAction: PromiseFailAction = PromiseFailAction.Default): Promise<GenericElemJacket> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForGenericElemJacket.name, selector);

      var htmlElement: HTMLElement = null;
      var iterationJr = new IterationDrone(this.CommonCore, this.WaitForGenericElemJacket.name + ' - selector: "' + selector + '"', true);
      let firstFind = true;

      while (!htmlElement && iterationJr.DecrementAndKeepGoing()) {
        htmlElement = this.NativeDocument.querySelector(selector);

        if (htmlElement && !StaticHelpers.IsNullOrUndefined(htmlElement)) {
          if (firstFind) {
            htmlElement = null;
            firstFind = false;
          } else {
            this.Logger.Log('found it');
            let genericElemJacket: GenericElemJacket = new GenericElemJacket(this.CommonCore, htmlElement);
            this.Logger.LogAsJsonPretty('found', genericElemJacket);
            resolve(genericElemJacket);
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
      this.Logger.FuncEnd(this.WaitForGenericElemJacket.name, selector);
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
          this.ErrorHand.HandleFatalError(this.WaitForAndClickWithPayload.name, ex);
          reject(ex);
        });
    });
  }

  public async WaitForCompleteNAB_DocumentJacket(friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([DocumentJacket.name, this.WaitForCompleteNAB_DocumentJacket.name], friendly);
      this.Logger.LogVal('url', this.NativeDocument.URL);
      this.Logger.LogVal('readyState', this.NativeDocument.readyState);

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForCompleteNAB_DocumentJacket.name, this.NativeDocument);

      var iterationJr: IterationDrone = new IterationDrone(this.CommonCore, this.WaitForCompleteNAB_DocumentJacket.name, false);
      this.LastKnownReadyStateNAB = new ReadyStateNAB(this.CommonCore, this.NativeDocument);

      while (iterationJr.DecrementAndKeepGoing() && !this.LastKnownReadyStateNAB.IsCompleteNAB()) {
        this.LastKnownReadyStateNAB.LogDebugValues();
        await iterationJr.Wait();
      }

      this.LastKnownReadyStateNAB.LogDebugValues();

      if (iterationJr.IsExhausted) {
        this.Logger.Log(iterationJr.IsExhaustedMsg);
        reject(iterationJr.IsExhaustedMsg);
      }
      else {
        resolve(this.LastKnownReadyStateNAB);
      }

      this.Logger.FuncEnd([DocumentJacket.name, this.WaitForCompleteNAB_DocumentJacket.name], friendly);
    });
  }
}