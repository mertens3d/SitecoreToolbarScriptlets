import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";
import { ReadyStateNAB } from "../../../Shared/scripts/Enums/ReadyState";
import { IterationDrone } from "../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ScDocumentProxy } from "./ScDocumentProxy";
import { IStateOfFrameStyling } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfFrameStyling";
import { ScWindowType } from "../../../Shared/scripts/Enums/scWindowType";

export class NativeIframeProxy extends _HindeCoreBase {
  private HtmlIFrameElement: HTMLIFrameElement;
  ScDocumentProxy: ScDocumentProxy;
  private NativeIframeId: string;

  constructor(hindeCore: IHindeCore, htmlIframeElement: HTMLIFrameElement) {
    super(hindeCore);
    this.HtmlIFrameElement = htmlIframeElement;
  }

  GetIframeHtmlElem(): HTMLIFrameElement {  //todo - get rid of this. is a temp workaround
    return this.HtmlIFrameElement;
  }

  GetNativeContentDoc(): ScDocumentProxy {
    return this.ScDocumentProxy;
  }

  Instantiate() {
    this.Logger.FuncStart(this.Instantiate.name, NativeIframeProxy.name);

    this.ScDocumentProxy = new ScDocumentProxy(this.HindeCore, this.HtmlIFrameElement.contentDocument);
    this.ScDocumentProxy.Instantiate();
    this.NativeIframeId = this.HtmlIFrameElement.id;

    this.Logger.FuncEnd(this.Instantiate.name, NativeIframeProxy.name);
  }

  GetScWindowType(): ScWindowType {
    return this.ScDocumentProxy.GetScWindowType();
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

  SetState(StateOfFrameStyling: IStateOfFrameStyling) {
    this.HtmlIFrameElement.style.height = StateOfFrameStyling.Height;
    this.HtmlIFrameElement.style.left = StateOfFrameStyling.Left;
    this.HtmlIFrameElement.style.position = StateOfFrameStyling.Position;
    this.HtmlIFrameElement.style.top = StateOfFrameStyling.Top;
    this.HtmlIFrameElement.style.width = StateOfFrameStyling.Width;
    this.HtmlIFrameElement.style.zIndex = StateOfFrameStyling.ZIndex;
  }
  GetStateOfStyling(): IStateOfFrameStyling {
    let sourceStyle = this.HtmlIFrameElement.style;
    let toReturn: IStateOfFrameStyling = {
      Height: sourceStyle.height,
      Left: sourceStyle.left,
      Position: sourceStyle.position,
      Top: sourceStyle.top,
      Width: sourceStyle.width,
      ZIndex: sourceStyle.zIndex
    };
    return toReturn;
  }

  async WaitForCompleteNABHtmlIframeElement(friendly: string): Promise<ReadyStateNAB> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABHtmlIframeElement.name, friendly);

      if (this.HtmlIFrameElement) {
        var iterationJr: IterationDrone = new IterationDrone(this.HindeCore, this.WaitForCompleteNABHtmlIframeElement.name, false);
        let readyStateNAB: ReadyStateNAB = new ReadyStateNAB(this.HindeCore, this.HtmlIFrameElement.contentDocument);

        while (iterationJr.DecrementAndKeepGoing() && readyStateNAB.DocIsAboutBlank()) {
          await iterationJr.Wait();
          readyStateNAB.SetDocument(this.HtmlIFrameElement.contentDocument);
          readyStateNAB.LogDebugValues();
        }

        if (iterationJr.IsExhausted) {
          this.Logger.Log(iterationJr.IsExhaustedMsg);
          resolve(readyStateNAB);
        }
        else {
          this.ScDocumentProxy = new ScDocumentProxy(this.HindeCore, this.HtmlIFrameElement.contentDocument);
          this.ScDocumentProxy.Instantiate();

          await this.ScDocumentProxy.WaitForCompleteNAB_ScDocumentProxy(friendly)
            .then((result: ReadyStateNAB) => {
              this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, result.DocumentReadtStateFriendly());
              resolve(result);
            })
            .catch((err) => reject(this.WaitForCompleteNABHtmlIframeElement + ' | ' + err));
        }
      }
      else {
        this.ErrorHand.ErrorAndThrow(this.WaitForCompleteNABHtmlIframeElement.name, 'No target doc: ' + friendly);
      }
      this.Logger.FuncEnd(this.WaitForCompleteNABHtmlIframeElement.name, friendly);;
    });
  }
}