import { ContentEditorProxy } from "../../../../../Content/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ContentEditorProxyMutationEvent_Observer } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { FrameProxyMutationEvent_Subject } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/FrameProxyMutationEvent/FrameProxyMutatedEvent_Subject";
import { DefaultStateOfFrame } from "../../../Classes/Defaults/DefaultStateOfFrame";
import { RecipeBasics } from "../../../Classes/RecipeBasics";
import { ILoggerAgent } from "../../Agents/ILoggerAgent";
import { InitResultContentEditorProxy, InitResultsFrameProxy, ISettingsAgent } from "../../Agents/ISettingsAgent";
import { IDataStateOfFrame } from "../States/IDataStateOfFrame";
import { FrameProxy } from "./FrameProxy";

export class CEFrameProxy extends FrameProxy {
  ContentEditorProxy: ContentEditorProxy;
  ContentEditorProxyMutationEvent_Observer: ContentEditorProxyMutationEvent_Observer;

  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement, nickName: string) {
    super(logger, iframeElem, nickName);
  }

  GetStateOfCEFrame(): IDataStateOfFrame {
    let toReturn: IDataStateOfFrame = new DefaultStateOfFrame();

    toReturn.Styling = this.IframeElem.style.cssText;

    if (this.ContentEditorProxy) {
      toReturn.StateOfContentEditor = this.ContentEditorProxy.GetStateOfContentEditor();
    }

    return toReturn;
  }

  async SetStateOfCEFrame(stateOfFrame: IDataStateOfFrame): Promise<void> {
    await this.ContentEditorProxy.SetStateOfContentEditor(stateOfFrame.StateOfContentEditor);
  }

  OnReadyInitCEFrameProxy(): Promise<InitResultsFrameProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.OnReadyInitCEFrameProxy.name);

      let recipeBasic = new RecipeBasics(this.Logger);
      let initResultFrameProxy = new InitResultsFrameProxy();

      await recipeBasic.WaitForPageReadyHtmlIframeElement(this.IframeElem)
        .then(() => this.ContentEditorProxy = new ContentEditorProxy(this.GetContentDoc(), this.Logger))
        .then(() => this.ContentEditorProxy.OnReadyInitContentEditorProxy())
        .then((result: InitResultContentEditorProxy) => initResultFrameProxy.InitResultContentEditorProxy = result)
        .then(() => {
          this.FrameProxyMutationEvent_Subject = new FrameProxyMutationEvent_Subject(this.Logger);

          this.ContentEditorProxy.ContentEditorProxyMutationEvent_Subject.RegisterObserver(this.ContentEditorProxyMutationEvent_Observer);
          this.ContentEditorProxyMutationEvent_Observer = new ContentEditorProxyMutationEvent_Observer(this.Logger, this);
          initResultFrameProxy.FrameProxyInitialized = true;
        })

        .then(() => resolve(initResultFrameProxy))
        .catch((err) => reject(this.OnReadyInitCEFrameProxy.name + ' | ' + err));
    });
  }
}