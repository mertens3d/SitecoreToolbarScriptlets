import { IterationDrone } from "../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ReadyStateNAB } from "../Shared/scripts/Enums/ReadyState";
import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateOfFrameStyling } from "../Shared/scripts/Interfaces/Data/States/IStateOfFrameStyling";
import { _HindeCoreBase } from "../Shared/scripts/_HindeCoreBase";
import { DocumentJacket } from "./DocumentJacket";
import { UrlJacket } from "./UrlJacket";

export class FrameJacket extends _HindeCoreBase {
  private HtmlIFrameElement: HTMLIFrameElement;
  public DocumentJacket: DocumentJacket;
  private NativeIframeId: string;

  constructor(hindeCore: IHindeCore, htmlIframeElement: HTMLIFrameElement) {
    super(hindeCore);
    this.HtmlIFrameElement = htmlIframeElement;
    this.BuildInstance();
    this.WireInstanceEvents();
  }

  private BuildInstance() {
    this.Logger.FuncStart(this.BuildInstance.name, FrameJacket.name);

    this.DocumentJacket = new DocumentJacket(this.HindeCore, this.HtmlIFrameElement.contentDocument);

    this.NativeIframeId = this.HtmlIFrameElement.id;

    this.Logger.FuncEnd(this.BuildInstance.name, FrameJacket.name);
  }

  private WireInstanceEvents() {
    // empty
  }

  GetUrlJacket(): UrlJacket {
    return this.DocumentJacket.UrlJacket;
  }

  async SetState(StateOfFrameStyling: IStateOfFrameStyling): Promise<void> {
    this.Logger.FuncStart(this.SetState.name, FrameJacket.name);
    this.HtmlIFrameElement.style.height = StateOfFrameStyling.Height;
    this.HtmlIFrameElement.style.left = StateOfFrameStyling.Left;
    this.HtmlIFrameElement.style.position = StateOfFrameStyling.Position;
    this.HtmlIFrameElement.style.top = StateOfFrameStyling.Top;
    this.HtmlIFrameElement.style.width = StateOfFrameStyling.Width;
    this.HtmlIFrameElement.style.zIndex = StateOfFrameStyling.ZIndex;
    this.Logger.FuncEnd(this.SetState.name, FrameJacket.name);
  }

  async GetState(): Promise<IStateOfFrameStyling> {
    let toReturn: IStateOfFrameStyling = null;
    try {
      let sourceStyle = this.HtmlIFrameElement.style;
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
      this.ErrorHand.ErrorAndThrow(this.GetState.name, err);
    }
    return toReturn;
  }

  TriggerInboundEventsAsync(): void {
  }

  //-----------------------------------------------------------------------------------
  GetIframeHtmlElem(): HTMLIFrameElement {
    return this.HtmlIFrameElement;
  }

  GetNativeContentDoc(): DocumentJacket {
    return this.DocumentJacket;
  }

  src(): string {
    return this.HtmlIFrameElement.src;
  }
  ZindexAsInt(): number {
    let toReturn: number = -99;

    if (this.HtmlIFrameElement.style && this.HtmlIFrameElement.style.zIndex) {
      //toReturn = this.IframeElem.style.zIndex;
      toReturn = parseInt(this.HtmlIFrameElement.style.zIndex);
    }

    return toReturn;
  }

  GetNativeIframeId(): string {
    return this.NativeIframeId;
  }

  private async WaitForNABHostedDoc(): Promise<void> {
    this.Logger.FuncStart(this.WaitForNABHostedDoc.name);
    try {
      var iterationJr: IterationDrone = new IterationDrone(this.HindeCore, this.WaitForNABHostedDoc.name, false);
      let readyStateNAB: ReadyStateNAB = new ReadyStateNAB(this.HindeCore, this.HtmlIFrameElement.contentDocument);

      while (iterationJr.DecrementAndKeepGoing() && readyStateNAB.DocIsAboutBlank()) {
        await iterationJr.Wait();
        readyStateNAB.SetDocument(this.HtmlIFrameElement.contentDocument);
        readyStateNAB.LogDebugValues();
      }

      if (iterationJr.IsExhausted) {
        this.Logger.Log(iterationJr.IsExhaustedMsg);
      }
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.WaitForNABHostedDoc.name, err);
    }
    this.Logger.FuncEnd(this.WaitForNABHostedDoc.name);
  }

  async WaitForCompleteNABHtmlIframeElement(friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABHtmlIframeElement.name, friendly);
      this.Logger.Log(this.DocumentJacket.UrlJacket.GetOriginalURL());

      if (this.HtmlIFrameElement) {
        await this.WaitForNABHostedDoc()
          .then(() => this.DocumentJacket = new DocumentJacket(this.HindeCore, this.HtmlIFrameElement.contentDocument))
          .then(() => this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(friendly))
          .then((result: ReadyStateNAB) => {
            this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, result.DocumentReadtStateFriendly());
            this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, this.HtmlIFrameElement.contentDocument.URL);
            this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, this.HtmlIFrameElement.contentDocument.readyState);
            resolve(result);
          })
          .catch((err) => reject(  this.WaitForCompleteNABHtmlIframeElement.name + ' | ' + err));
      }
      else {
        this.ErrorHand.ErrorAndThrow(this.WaitForCompleteNABHtmlIframeElement.name, 'No target doc: ' + friendly);
      }
      this.Logger.FuncEnd(this.WaitForCompleteNABHtmlIframeElement.name, friendly);;
    });
  }
}