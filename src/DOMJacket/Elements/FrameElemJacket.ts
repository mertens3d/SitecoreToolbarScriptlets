import { IterationDrone } from "../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ReadyStateNAB } from "../../Shared/scripts/Classes/ReadyState";
import { ICommonCore } from "../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { IFrameJacketStyling } from "../../Shared/scripts/Interfaces/Data/States/IStateOfFrameStyling";
import { DocumentJacket } from "../Document/DocumentJacket";
import { UrlJacket } from "./../UrlJacket";
import { ElementJacketOfType } from "./ElementJacketBaseOfType";
import { GenericElemJacket } from "./GenericElemJacket";
import { SharedConst } from "../../Shared/scripts/SharedConst";

export class FrameElemJacket extends ElementJacketOfType<HTMLIFrameElement> {
  public DocumentJacket: DocumentJacket;
  private NativeIframeId: string;

  private constructor(commonCore: ICommonCore, htmlIframeElement: HTMLIFrameElement) {
    super(commonCore, htmlIframeElement);
  }

  private static MfgrFrameElemJacketsStep1(commonCore: ICommonCore, inputValue: GenericElemJacket | HTMLElement): FrameElemJacket {
    let htmlIframeElement: HTMLIFrameElement = null;
    if (inputValue instanceof GenericElemJacket) {
      if (inputValue.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
        htmlIframeElement = <HTMLIFrameElement>inputValue.NativeElement;
      } else {
        commonCore.ErrorHand.HandleFatalError([FrameElemJacket.name, this.FactoryFrameElemJackets.name], 'Invalid tag name: ' + inputValue.NodeTagName);
      }
    } else if (inputValue instanceof HTMLElement) {
      htmlIframeElement = <HTMLIFrameElement>inputValue;
    }

    let frameElemJacket = new FrameElemJacket(commonCore, htmlIframeElement);
    return frameElemJacket;
  }

  public static FactoryFrameElemJackets(commonCore: ICommonCore, inputValue: GenericElemJacket[] | HTMLElement[]): Promise<FrameElemJacket[]> {
    return new Promise(async (resolve, reject) => {
      let frameElemJacketAr: FrameElemJacket[] = [];

      inputValue.forEach((inputValue: GenericElemJacket | HTMLElement) => {
                frameElemJacketAr.push(this.MfgrFrameElemJacketsStep1(commonCore, inputValue));
      });

      let promiseArFrame: Promise<void>[] = [];

      frameElemJacketAr.forEach((frameElemJacket: FrameElemJacket) => {
        promiseArFrame.push(frameElemJacket.PrepareFrameJacket());
      });

      await Promise.all(promiseArFrame)
        .then(() => resolve(frameElemJacketAr))
        .catch((err) => reject(commonCore.ErrorHand.FormatRejectMessage([FrameElemJacket.name, this.FactoryFrameElemJackets.name], err)));
    });
  }

  private async PrepareFrameJacket(): Promise<void> {
    this.Logger.FuncStart(this.PrepareFrameJacket.name, FrameElemJacket.name);
    try {
      this.WaitForCompleteNABHtmlIframeElement(FrameElemJacket.name + this.PrepareFrameJacket.name)
        .then(() => DocumentJacket.FactoryMakeDocumentJacket(this.CommonCore, this.NativeElement.contentDocument))
        .then((documentJacket: DocumentJacket) => this.DocumentJacket = documentJacket)
        .catch((err) => this.ErrorHand.HandleFatalError(this.PrepareFrameJacket.name, err));

      this.NativeIframeId = this.NativeElement.id;
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.PrepareFrameJacket.name, err)
    }
    this.Logger.FuncEnd(this.PrepareFrameJacket.name, FrameElemJacket.name);
  }

  GetUrlJacket(): UrlJacket {
    return this.DocumentJacket.UrlJacket;
  }

  SetFrameStyling(StateOfFrameStyling: IFrameJacketStyling): void {
    this.Logger.FuncStart(this.SetFrameStyling.name, FrameElemJacket.name);
    this.NativeElement.style.height = StateOfFrameStyling.Height;
    this.NativeElement.style.left = StateOfFrameStyling.Left;
    this.NativeElement.style.position = StateOfFrameStyling.Position;
    this.NativeElement.style.top = StateOfFrameStyling.Top;
    this.NativeElement.style.width = StateOfFrameStyling.Width;
    this.NativeElement.style.zIndex = StateOfFrameStyling.ZIndex;
    this.Logger.FuncEnd(this.SetFrameStyling.name, FrameElemJacket.name);
  }

  GetFrameStyling(): IFrameJacketStyling {
    let toReturn: IFrameJacketStyling = null;
    try {
      let sourceStyle = this.NativeElement.style;
      toReturn = {
        Height: sourceStyle.height,
        Left: sourceStyle.left,
        Position: sourceStyle.position,
        Top: sourceStyle.top,
        Width: sourceStyle.width,
        ZIndex: sourceStyle.zIndex
      };
    }
    catch (err) {
      this.ErrorHand.HandleFatalError(this.GetFrameStyling.name, err);
    }
    return toReturn;
  }

  TriggerInboundEventsAsync(): void {
  }

  //-----------------------------------------------------------------------------------
  GetIframeHtmlElem(): HTMLIFrameElement {
    return this.NativeElement;
  }

  GetNativeContentDoc(): DocumentJacket {
    return this.DocumentJacket;
  }

  src(): string {
    return this.NativeElement.src;
  }
  ZindexAsInt(): number {
    let toReturn: number = -99;

    if (this.NativeElement.style && this.NativeElement.style.zIndex) {
      toReturn = parseInt(this.NativeElement.style.zIndex);
    }

    this.Logger.LogVal(this.ZindexAsInt.name, toReturn.toString());
    return toReturn;
  }

  GetNativeIframeId(): string {
    return this.NativeIframeId;
  }

  private async WaitForNABHostedDoc(): Promise<void> {
    this.Logger.FuncStart(this.WaitForNABHostedDoc.name);
    try {
      var iterationJr: IterationDrone = new IterationDrone(this.CommonCore, this.WaitForNABHostedDoc.name, false);
      let readyStateNAB: ReadyStateNAB = new ReadyStateNAB(this.CommonCore, this.NativeElement.contentDocument);

      while (iterationJr.DecrementAndKeepGoing() && readyStateNAB.DocIsAboutBlank()) {
        await iterationJr.Wait();
        readyStateNAB.SetDocument(this.NativeElement.contentDocument);
        readyStateNAB.LogDebugValues();
      }

      if (iterationJr.IsExhausted) {
        this.Logger.Log(iterationJr.IsExhaustedMsg);
      }
    }
    catch (err) {
      this.ErrorHand.HandleFatalError(this.WaitForNABHostedDoc.name, err);
    }
    this.Logger.FuncEnd(this.WaitForNABHostedDoc.name);
  }

  async WaitForCompleteNABHtmlIframeElement(friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABHtmlIframeElement.name, friendly);
      //this.Logger.Log(this.DocumentJacket.UrlJacket.GetOriginalURL());

      if (this.NativeElement) {
        await this.WaitForNABHostedDoc()
          .then(() => DocumentJacket.FactoryMakeDocumentJacket(this.CommonCore, this.NativeElement.contentDocument))
          .then((documentJacket: DocumentJacket) => this.DocumentJacket = documentJacket)
          .then(() => this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(friendly))
          .then(() => resolve(this.DocumentJacket.GetLastKnownReadyState()))
          //.then((result: ReadyStateNAB) => {
          //  this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, result.DocumentReadtStateFriendly());
          //  this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, this.NativeElement.contentDocument.URL);
          //  this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, this.NativeElement.contentDocument.readyState);
          //  resolve(result);
          //})
          .catch((err) => reject(this.ErrorHand.FormatRejectMessage([this.WaitForCompleteNABHtmlIframeElement.name], err)));
      }
      else {
        reject(this.ErrorHand.FormatRejectMessage([FrameElemJacket.name, this.WaitForCompleteNABHtmlIframeElement.name], 'No target doc: ' + friendly));
      }
      this.Logger.FuncEnd(this.WaitForCompleteNABHtmlIframeElement.name, friendly);;
    });
  }
}