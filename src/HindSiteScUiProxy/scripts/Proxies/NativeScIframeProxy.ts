import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";
import { ReadyStateNAB } from "../../../Shared/scripts/Enums/ReadyState";
import { IterationDrone } from "../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ScDocumentProxy } from "./ScDocumentProxy";
import { IStateOfFrameStyling } from "../../../Shared/scripts/Interfaces/Data/States/IStateOfFrameStyling";
import { ScWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { _BaseStateFullProxy } from "./Desktop/DesktopProxy/FrameProxies/_StateProxy";
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";

export class NativeIframeProxy extends _BaseStateFullProxy<IStateOfFrameStyling> implements IStateFullProxy<IStateOfFrameStyling> {
  private HtmlIFrameElement: HTMLIFrameElement;
  ScDocumentProxy: ScDocumentProxy;
  private NativeIframeId: string;

  constructor(hindeCore: IHindeCore, htmlIframeElement: HTMLIFrameElement) {
    super(hindeCore);
    this.HtmlIFrameElement = htmlIframeElement;
  }

  Instantiate() {
    this.Logger.FuncStart(this.Instantiate.name, NativeIframeProxy.name);

    this.ScDocumentProxy = new ScDocumentProxy(this.HindeCore, this.HtmlIFrameElement.contentDocument);
    this.ScDocumentProxy.Instantiate();

    this.NativeIframeId = this.HtmlIFrameElement.id;

    this.Logger.FuncEnd(this.Instantiate.name, NativeIframeProxy.name);
  }

  WireEvents() {
    this.ScDocumentProxy.WireEvents();
  }

  async SetState(StateOfFrameStyling: IStateOfFrameStyling): Promise<void> {
    this.Logger.FuncStart(this.SetState.name, NativeIframeProxy.name);
    this.HtmlIFrameElement.style.height = StateOfFrameStyling.Height;
    this.HtmlIFrameElement.style.left = StateOfFrameStyling.Left;
    this.HtmlIFrameElement.style.position = StateOfFrameStyling.Position;
    this.HtmlIFrameElement.style.top = StateOfFrameStyling.Top;
    this.HtmlIFrameElement.style.width = StateOfFrameStyling.Width;
    this.HtmlIFrameElement.style.zIndex = StateOfFrameStyling.ZIndex;
    this.Logger.FuncEnd(this.SetState.name, NativeIframeProxy.name);
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
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.GetState.name, err);
    }
    return toReturn;
  }

  //-----------------------------------------------------------------------------------

  GetIframeHtmlElem(): HTMLIFrameElement {  //todo - get rid of this. is a temp workaround
    return this.HtmlIFrameElement;
  }

  GetNativeContentDoc(): ScDocumentProxy {
    return this.ScDocumentProxy;
  }

  GetScWindowType(): ScWindowType {
    this.ErrorHand.ThrowIfNullOrUndefined(this.GetScWindowType.name, this.ScDocumentProxy);
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
          this.ScDocumentProxy.WireEvents();

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