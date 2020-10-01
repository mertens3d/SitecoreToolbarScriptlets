import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { ReadyStateNAB } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { ILoggerAgent } from "../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ReportResultsInitDTFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy";
import { IStateOfContentEditor } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor";
import { IStateOfDTFrame } from "../../../../../../Shared/scripts/Interfaces/Data/States/IStateOfDTFrame";
import { ContentEditorProxy } from "../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ContentEditorProxyMutationEvent_Observer } from "../Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { IContentEditorProxyMutationEvent_Payload } from "../Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Subject } from "../Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { IDTFrameProxyMutationEvent_Payload } from "../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { _BaseFrameProxy } from "./_BaseFrameProxy";
import { DefaultStateOfDTFrame } from "../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTFrame";

export class DTFrameProxy extends _BaseFrameProxy {
  public ContentEditorProxy: ContentEditorProxy;
  ContentEditorProxyMutationEvent_Observer: ContentEditorProxyMutationEvent_Observer;
  Discriminator = DTFrameProxy.name;
  public initReportFrameProxy: ReportResultsInitDTFrameProxy;

  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement) {
    super(logger, iframeElem);
    if (iframeElem) {
      this.Friendly = 'DTFrameProxy_' + iframeElem.id;
    } else {
      this.Logger.ErrorAndThrow(DTFrameProxy.name, ' null check');
    }
  }

  async Instantiate_DTFrameProxy(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.Instantiate_DTFrameProxy.name, this.Friendly);

      let recipeBasic = new RecipeBasics(this.Logger);
      this.initReportFrameProxy = new ReportResultsInitDTFrameProxy();

      await recipeBasic.WaitForCompleteNABHtmlIframeElement(this.HTMLIframeElement, this.Friendly)
        .then((result: ReadyStateNAB) => {
          if (!result.IsCompleteNAB()) {
            reject(result.DocumentReadtStateFriendly())
          }
        })
        .then(() => this.ContentEditorProxy = new ContentEditorProxy(this.Logger, this.GetContentDoc(), this.Friendly))
        .then(() => this.ContentEditorProxy.Instantiate_ContentEditorProxy())
        .then(() => {
          this.DTFrameProxyMutationEvent_Subject = new DTFrameProxyMutationEvent_Subject(this.Logger);
          this.ContentEditorProxyMutationEvent_Observer = new ContentEditorProxyMutationEvent_Observer(this.Logger, this);
          this.initReportFrameProxy.DTFrameProxyInitialized = true;
        })

        .then(() => resolve())
        .catch((err) => reject(this.Instantiate_DTFrameProxy.name + ' | ' + err));

      this.Logger.FuncEnd(this.Instantiate_DTFrameProxy.name, this.Friendly);
    });
  }

  async WireEvents_DTFrameProxy() {
    this.Logger.FuncStart(this.WireEvents_DTFrameProxy.name);
    this.ContentEditorProxy.ContentEditorProxyMutationEvent_Subject.RegisterObserver(this.ContentEditorProxyMutationEvent_Observer);
    this.ContentEditorProxy.WireEvents_ContentEditorProxy();
    this.Logger.FuncEnd(this.WireEvents_DTFrameProxy.name);
  }

  GetStateOfDTFrame(): Promise<IStateOfDTFrame> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfDTFrame.name);
      let stateOfDTFrame: IStateOfDTFrame = new DefaultStateOfDTFrame();
      let sourceStyle = this.HTMLIframeElement.style;
      stateOfDTFrame.StateOfFrameStyling = {
        Height: sourceStyle.height,
        Left: sourceStyle.left,
        Position: sourceStyle.position,
        Top: sourceStyle.top,
        Width: sourceStyle.width,
        ZIndex: sourceStyle.zIndex
      }
      stateOfDTFrame.ZIndex = this.GetZindexAsInt();
      if (this.ContentEditorProxy) {
        await this.ContentEditorProxy.GetStateOfContentEditorProxy()
          .then((stateOfContentEditorProxy: IStateOfContentEditor) => stateOfDTFrame.StateOfContentEditor = stateOfContentEditorProxy)
          .catch((err) => this.GetStateOfDTFrame.name + ' | ' + err);
      }
      resolve(stateOfDTFrame);
      this.Logger.FuncEnd(this.GetStateOfDTFrame.name);
    });
  }

  private SetFrameStyling(stateOfDTFrame: IStateOfDTFrame) {
    this.Logger.FuncStart(this.SetFrameStyling.name);

    this.HTMLIframeElement.style.height = stateOfDTFrame.StateOfFrameStyling.Height;
    this.HTMLIframeElement.style.left = stateOfDTFrame.StateOfFrameStyling.Left;
    this.HTMLIframeElement.style.position = stateOfDTFrame.StateOfFrameStyling.Position;
    this.HTMLIframeElement.style.top = stateOfDTFrame.StateOfFrameStyling.Top;
    this.HTMLIframeElement.style.width = stateOfDTFrame.StateOfFrameStyling.Width;
    this.HTMLIframeElement.style.zIndex = stateOfDTFrame.StateOfFrameStyling.ZIndex;

    this.Logger.FuncEnd(this.SetFrameStyling.name);
  }

  async SetStateOfDTFrame(stateOfDTFrame: IStateOfDTFrame): Promise<void> {
    try {
      this.Logger.FuncStart(this.SetStateOfDTFrame.name);
      this.DTFrameProxyMutationEvent_Subject.DisableNotifications();

      await this.ContentEditorProxy.SetStateOfContentEditorAsync(stateOfDTFrame.StateOfContentEditor)
        .then(() => {
          this.SetFrameStyling(stateOfDTFrame)
          this.DTFrameProxyMutationEvent_Subject.EnableNotifications();
        });
    } catch (err) {
      this.Logger.ErrorAndThrow(this.SetStateOfDTFrame.name, err);
    }
    this.Logger.FuncEnd(this.SetStateOfDTFrame.name);
  }

  OnContentEditorProxyMutation(payload: IContentEditorProxyMutationEvent_Payload) {
    let dtFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload = {
      ContentEditorProxyMutationPayload: payload,
      FrameId: this.HTMLIframeElement.id
      //DTFrameProxy: this
    }
    this.DTFrameProxyMutationEvent_Subject.NotifyObserversAsync(dtFrameProxyMutationEvent_Payload);
  }
}