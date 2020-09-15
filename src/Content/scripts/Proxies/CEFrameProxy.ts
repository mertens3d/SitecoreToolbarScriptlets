import { ContentEditorProxy } from "./ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ContentEditorProxyMutationEvent_Observer } from "./Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { FrameProxyMutationEvent_Subject } from "./Desktop/DesktopProxy/Events/FrameProxyMutationEvent/FrameProxyMutatedEvent_Subject";
import { DefaultStateOfFrame } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfFrame";
import { RecipeBasics } from "../../../Shared/scripts/Classes/RecipeBasics";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { InitResultContentEditorProxy, InitResultsCEFrameProxy, ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataStateOfFrame, IFrameStyling } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfFrame";
import { _BaseFrameProxy } from "./_BaseFrameProxy";
import { IContentEditorProxyMutationEvent_Payload } from "./Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Payload";
import { ICEFrameProxyMutationEvent_Payload } from "./Desktop/DesktopProxy/Events/FrameProxyMutationEvent/IFrameProxyMutationEvent_Payload";

export class CEFrameProxy extends _BaseFrameProxy {
  ContentEditorProxy: ContentEditorProxy;
  ContentEditorProxyMutationEvent_Observer: ContentEditorProxyMutationEvent_Observer;
  Discriminator = CEFrameProxy.name;

  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement) {
    super(logger, iframeElem);
  }

  GetStateOfCEFrame(): IDataStateOfFrame {
    let toReturn: IDataStateOfFrame = new DefaultStateOfFrame();

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

  async SetStateOfCEFrame(stateOfFrame: IDataStateOfFrame): Promise<void> {
    await this.ContentEditorProxy.SetStateOfContentEditor(stateOfFrame.StateOfContentEditor)
      .then(() => {
        this.HTMLIframeElement.style.height = stateOfFrame.Styling.height;
        this.HTMLIframeElement.style.left = stateOfFrame.Styling.left;
        this.HTMLIframeElement.style.position = stateOfFrame.Styling.position;
        this.HTMLIframeElement.style.top = stateOfFrame.Styling.top;
        this.HTMLIframeElement.style.width = stateOfFrame.Styling.width;
        this.HTMLIframeElement.style.zIndex = stateOfFrame.Styling.zIndex;
      });
  }

  OnContentEditorProxyMutation(payload: IContentEditorProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnContentEditorProxyMutation.name);
    let frameProxyMutationEvent_Payload: ICEFrameProxyMutationEvent_Payload = {
      ContentEditorProxyMutationPayload: payload,
      CeFrameProxy: this
    }

    this.FrameProxyMutationEvent_Subject.NotifyObservers(frameProxyMutationEvent_Payload);
    this.Logger.FuncEnd(this.OnContentEditorProxyMutation.name);
  }

  OnReadyInitCEFrameProxy(): Promise<InitResultsCEFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitCEFrameProxy.name);

      let recipeBasic = new RecipeBasics(this.Logger);
      let initResultFrameProxy = new InitResultsCEFrameProxy();

      await recipeBasic.WaitForReadyNABHtmlIframeElement(this.HTMLIframeElement)
        .then(() => this.ContentEditorProxy = new ContentEditorProxy(this.GetContentDoc(), this.Logger))
        .then(() => this.ContentEditorProxy.OnReadyInitContentEditorProxy())
        .then((result: InitResultContentEditorProxy) => initResultFrameProxy.InitResultContentEditorProxy = result)
        .then(() => {
          this.FrameProxyMutationEvent_Subject = new FrameProxyMutationEvent_Subject(this.Logger);

          this.ContentEditorProxyMutationEvent_Observer = new ContentEditorProxyMutationEvent_Observer(this.Logger, this);
          this.ContentEditorProxy.ContentEditorProxyMutationEvent_Subject.RegisterObserver(this.ContentEditorProxyMutationEvent_Observer);
          initResultFrameProxy.FrameProxyInitialized = true;
        })

        .then(() => resolve(initResultFrameProxy))
        .catch((err) => reject(this.OnReadyInitCEFrameProxy.name + ' | ' + err));
    });
  }
}