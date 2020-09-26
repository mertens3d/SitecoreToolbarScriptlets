import { DefaultStateOfFrame } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfFrame";
import { RecipeBasics } from "../../../Shared/scripts/Classes/RecipeBasics";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ContentEditorProxy } from "./ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ContentEditorProxyMutationEvent_Observer } from "./Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { IContentEditorProxyMutationEvent_Payload } from "./Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { _BaseFrameProxy } from "./_BaseFrameProxy";
import { IDTFrameProxyMutationEvent_Payload } from "./Desktop/DesktopProxy/Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { IDataStateOfDTFrame } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame";
import { InitResultsDTFrameProxy } from "../../../Shared/scripts/Interfaces/Agents/InitResultsDTFrameProxy";
import { DTFrameProxyMutationEvent_Subject } from "./Desktop/DesktopProxy/Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { InitResultContentEditorProxy } from "../../../Shared/scripts/Interfaces/Agents/InitResultContentEditorProxy";

export class DTFrameProxy extends _BaseFrameProxy {
  ContentEditorProxy: ContentEditorProxy;
  ContentEditorProxyMutationEvent_Observer: ContentEditorProxyMutationEvent_Observer;
  Discriminator = DTFrameProxy.name;

  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement) {
    super(logger, iframeElem);
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

  async SetStateOfDTFrame(stateOfDTFrame: IDataStateOfDTFrame): Promise<void> {
    await this.ContentEditorProxy.SetStateOfContentEditor(stateOfDTFrame.StateOfContentEditor)
      .then(() => {
        this.HTMLIframeElement.style.height = stateOfDTFrame.Styling.height;
        this.HTMLIframeElement.style.left = stateOfDTFrame.Styling.left;
        this.HTMLIframeElement.style.position = stateOfDTFrame.Styling.position;
        this.HTMLIframeElement.style.top = stateOfDTFrame.Styling.top;
        this.HTMLIframeElement.style.width = stateOfDTFrame.Styling.width;
        this.HTMLIframeElement.style.zIndex = stateOfDTFrame.Styling.zIndex;
      });
  }

  OnContentEditorProxyMutation(payload: IContentEditorProxyMutationEvent_Payload) {
    let dtFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload = {
      ContentEditorProxyMutationPayload: payload,
      DTFrameProxy: this
    }
    this.DTFrameProxyMutationEvent_Subject.NotifyObservers(dtFrameProxyMutationEvent_Payload);
  }

  OnReadyInitDTFrameProxy(): Promise<InitResultsDTFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitDTFrameProxy.name);

      let recipeBasic = new RecipeBasics(this.Logger);
      let initResultFrameProxy = new InitResultsDTFrameProxy();

      await recipeBasic.WaitForReadyNABHtmlIframeElement(this.HTMLIframeElement)
        .then(() => this.ContentEditorProxy = new ContentEditorProxy(this.GetContentDoc(), this.Logger))
        .then(() => this.ContentEditorProxy.OnReadyInitContentEditorProxy())
        .then((result: InitResultContentEditorProxy) => initResultFrameProxy.InitResultContentEditorProxy = result)
        .then(() => {
          this.DTFrameProxyMutationEvent_Subject = new DTFrameProxyMutationEvent_Subject(this.Logger);

          this.ContentEditorProxyMutationEvent_Observer = new ContentEditorProxyMutationEvent_Observer(this.Logger, this);
          this.ContentEditorProxy.ContentEditorProxyMutationEvent_Subject.RegisterObserver(this.ContentEditorProxyMutationEvent_Observer);
          initResultFrameProxy.DTFrameProxyInitialized = true;
        })

        .then(() => resolve(initResultFrameProxy))
        .catch((err) => reject(this.OnReadyInitDTFrameProxy.name + ' | ' + err));
    });
  }
}