import { IterationDrone } from "../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ReadyStateNAB } from "../../../Shared/scripts/Classes/ReadyStateNAB";
import { ICommonCore } from "../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { IFrameJacketStyling } from "../../../Shared/scripts/Interfaces/StateOf/IStateOfFrameStyling";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { DocumentJacket } from "../Document/DocumentJacket";
import { UrlJacket } from "./../UrlJacket";
import { ElementJacketOfType } from "./ElementJacketOfType";
import { IJacketOfType } from "../../../Shared/scripts/IJacketOfType";

export class FrameJacket extends ElementJacketOfType<HTMLIFrameElement> {
  public DocumentJacket: DocumentJacket;
  private NativeIframeId: string;

  private constructor(commonCore: ICommonCore, htmlIframeElement: HTMLIFrameElement) {
    super(commonCore, htmlIframeElement);
  }

  private static MfgrFrameElemJacketsStep1(commonCore: ICommonCore, inputValue: IJacketOfType | HTMLElement): FrameJacket {
    let htmlIframeElement: HTMLIFrameElement = null;
    if (inputValue instanceof ElementJacketOfType) {
      if (inputValue.NodeTagName === SharedConst.Const.KeyWords.NodeTagName.IFrame) {
        htmlIframeElement = <HTMLIFrameElement>inputValue.NativeElement;
      } else {
        commonCore.ErrorHand.HandleFatalError([FrameJacket.name, this.FactoryFrameElemJackets.name], 'Invalid tag name: ' + inputValue.NodeTagName);
      }
    } else if (inputValue instanceof HTMLElement) {
      htmlIframeElement = <HTMLIFrameElement>inputValue;
    }

    let frameElemJacket = new FrameJacket(commonCore, htmlIframeElement);
    return frameElemJacket;
  }

  public static FactoryFrameElemJackets(commonCore: ICommonCore, inputValue: IJacketOfType[] | HTMLElement[]): Promise<FrameJacket[]> {
    return new Promise(async (resolve, reject) => {
      commonCore.Logger.FuncStart([FrameJacket.name, this.FactoryFrameElemJackets.name]);
      let frameElemJacketAr: FrameJacket[] = [];

      inputValue.forEach((inputValue: IJacketOfType | HTMLElement) => {
        frameElemJacketAr.push(this.MfgrFrameElemJacketsStep1(commonCore, inputValue));
      });

      let promiseArFrame: Promise<void>[] = [];

      frameElemJacketAr.forEach((frameElemJacket: FrameJacket) => {
        promiseArFrame.push(frameElemJacket.PrepareFrameJacket());
      });

      await Promise.all(promiseArFrame)
        .then(() => resolve(frameElemJacketAr))
        .catch((err: any) => reject(commonCore.ErrorHand.FormatRejectMessage([FrameJacket.name, this.FactoryFrameElemJackets.name], err)));


      commonCore.Logger.FuncEnd([FrameJacket.name, this.FactoryFrameElemJackets.name]);
    });
  }

  private async PrepareFrameJacket(): Promise<void> {
    this.Logger.FuncStart([FrameJacket.name, this.PrepareFrameJacket.name]);
    try {
      await this.WaitForCompleteNABFrameElement(FrameJacket.name + this.PrepareFrameJacket.name)
        .then(() => DocumentJacket.FactoryMakeDocumentJacket(this.CommonCore, this.NativeElement.contentDocument))
        .then((documentJacket: DocumentJacket) => this.DocumentJacket = documentJacket)
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.PrepareFrameJacket.name, err));

      this.NativeIframeId = this.NativeElement.id;
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.PrepareFrameJacket.name, err)
    }
    this.Logger.FuncEnd([FrameJacket.name, this.PrepareFrameJacket.name]);
  }

  GetUrlJacket(): UrlJacket {
    return this.DocumentJacket.UrlJacket;
  }

  SetFrameStyling(StateOfFrameStyling: IFrameJacketStyling): void {
    this.Logger.FuncStart(this.SetFrameStyling.name, FrameJacket.name);
    this.NativeElement.style.height = StateOfFrameStyling.Height;
    this.NativeElement.style.left = StateOfFrameStyling.Left;
    this.NativeElement.style.position = StateOfFrameStyling.Position;
    this.NativeElement.style.top = StateOfFrameStyling.Top;
    this.NativeElement.style.width = StateOfFrameStyling.Width;
    this.NativeElement.style.zIndex = StateOfFrameStyling.ZIndex;
    this.Logger.FuncEnd(this.SetFrameStyling.name, FrameJacket.name);
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
    catch (err: any) {
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


  GetNativeIframeId(): string {
    return this.NativeIframeId;
  }

  private async WaitForNABHostedDoc(): Promise<void> {
    this.Logger.FuncStart(this.WaitForNABHostedDoc.name);
    try {
      var iterationJr: IterationDrone = new IterationDrone(this.CommonCore, this.WaitForNABHostedDoc.name, false);
      let readyStateNAB: ReadyStateNAB = null;

      let keepGoing: boolean = true;

      while (iterationJr.DecrementAndKeepGoing() && keepGoing) {
        if (this.NativeElement.contentDocument) {
          readyStateNAB = new ReadyStateNAB(this.CommonCore, this.NativeElement.contentDocument);

          //readyStateNAB.SetDocument(this.NativeElement.contentDocument);
          keepGoing = readyStateNAB.DocIsAboutBlank();
          readyStateNAB.LogDebugValues();
        } else {
          keepGoing = true;
        }
        await iterationJr.Wait();
      }

      if (iterationJr.IsExhausted) {
        this.Logger.Log(iterationJr.IsExhaustedMsg);
      }
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError(this.WaitForNABHostedDoc.name, err);
    }
    this.Logger.FuncEnd(this.WaitForNABHostedDoc.name);
  }

  async WaitForCompleteNABFrameElement(friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([FrameJacket.name, this.WaitForCompleteNABFrameElement.name], friendly);
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
          .catch((err: any) => reject(this.ErrorHand.FormatRejectMessage([FrameJacket.name, this.WaitForCompleteNABFrameElement.name], err)));
      }
      else {
        reject(this.ErrorHand.FormatRejectMessage([FrameJacket.name, this.WaitForCompleteNABFrameElement.name], 'No target doc: ' + friendly));
      }
      this.Logger.FuncEnd([FrameJacket.name, this.WaitForCompleteNABFrameElement.name], friendly);;
    });
  }
}