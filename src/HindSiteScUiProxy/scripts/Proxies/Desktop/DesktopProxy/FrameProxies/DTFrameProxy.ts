import { DefaultStateOfFrame } from "../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfFrame";
import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { ILoggerAgent } from "../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ContentEditorProxy } from "../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ContentEditorProxyMutationEvent_Observer } from "../Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { IContentEditorProxyMutationEvent_Payload } from "../Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { _BaseFrameProxy } from "./_BaseFrameProxy";
import { IDTFrameProxyMutationEvent_Payload } from "../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { IDataStateOfDTFrame } from "../../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { ReportResultsInitDTFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy";
import { DTFrameProxyMutationEvent_Subject } from "../Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { InitReportContentEditorProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/InitResultContentEditorProxy";

export class DTFrameProxy extends _BaseFrameProxy {
  public ContentEditorProxy: ContentEditorProxy;
  ContentEditorProxyMutationEvent_Observer: ContentEditorProxyMutationEvent_Observer;
  Discriminator = DTFrameProxy.name;
  public initReportFrameProxy: ReportResultsInitDTFrameProxy;

  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement) {
    super(logger, iframeElem);
  }

  async Instantiate_DTFrameProxy(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.Instantiate_DTFrameProxy.name);

      let recipeBasic = new RecipeBasics(this.Logger);
      this.initReportFrameProxy = new ReportResultsInitDTFrameProxy();

      await recipeBasic.WaitForReadyNABHtmlIframeElement(this.HTMLIframeElement)
        .then(() => this.ContentEditorProxy = new ContentEditorProxy(this.Logger, this.GetContentDoc()))
        .then(() => this.ContentEditorProxy.Instantiate_ContentEditorProxy())
        .then(() => {
          this.DTFrameProxyMutationEvent_Subject = new DTFrameProxyMutationEvent_Subject(this.Logger);
          this.ContentEditorProxyMutationEvent_Observer = new ContentEditorProxyMutationEvent_Observer(this.Logger, this);
          this.initReportFrameProxy.DTFrameProxyInitialized = true;
        })

        .then(() => resolve())
        .catch((err) => reject(this.Instantiate_DTFrameProxy.name + ' | ' + err));

      this.Logger.FuncEnd(this.Instantiate_DTFrameProxy.name);
    });
  }

  async WireEvents_DTFrameProxy() {
    this.Logger.FuncStart(this.WireEvents_DTFrameProxy.name);
    this.ContentEditorProxy.ContentEditorProxyMutationEvent_Subject.RegisterObserver(this.ContentEditorProxyMutationEvent_Observer);
    this.ContentEditorProxy.WireEvents_ContentEditorProxy();
    this.Logger.FuncEnd(this.WireEvents_DTFrameProxy.name);
  }

  GetStateOfDTFrame(): IDataStateOfDTFrame {
    let toReturn: IDataStateOfDTFrame = new DefaultStateOfFrame();

    let sourceStyle = this.HTMLIframeElement.style;

    toReturn.Styling = {
      height: sourceStyle.height,
      left: sourceStyle.left,
      position: sourceStyle.position,
      top: sourceStyle.top,
      width: sourceStyle.width,
      zIndex: sourceStyle.zIndex
    }

    if (this.ContentEditorProxy) {
      toReturn.StateOfContentEditor = this.ContentEditorProxy.GetStateOfContentEditor();
    }

    return toReturn;
  }

  private SetFrameStyling(stateOfDTFrame: IDataStateOfDTFrame) {
    this.Logger.FuncStart(this.SetFrameStyling.name);

    this.HTMLIframeElement.style.height = stateOfDTFrame.Styling.height;
    this.HTMLIframeElement.style.left = stateOfDTFrame.Styling.left;
    this.HTMLIframeElement.style.position = stateOfDTFrame.Styling.position;
    this.HTMLIframeElement.style.top = stateOfDTFrame.Styling.top;
    this.HTMLIframeElement.style.width = stateOfDTFrame.Styling.width;
    this.HTMLIframeElement.style.zIndex = stateOfDTFrame.Styling.zIndex;

    this.Logger.FuncEnd(this.SetFrameStyling.name);
  }

  async SetStateOfDTFrame(stateOfDTFrame: IDataStateOfDTFrame): Promise<void> {
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
      DTFrameProxy: this
    }
    this.DTFrameProxyMutationEvent_Subject.NotifyObservers(dtFrameProxyMutationEvent_Payload);
  }
}