import { ContentEditorProxy } from "../../../../../Content/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ContentEditorProxyMutationEvent_Observer } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { FrameProxyMutationEvent_Subject } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/FrameProxyMutationEvent/FrameProxyMutatedEvent_Subject";
import { RecipeBasics } from "../../../Classes/RecipeBasics";
import { ILoggerAgent } from "../../Agents/ILoggerAgent";
import { InitResultContentEditorProxy, InitResultsFrameProxy, ISettingsAgent } from "../../Agents/ISettingsAgent";
import { FrameProxy } from "./FrameProxy";
import { IContentEditorProxyMutationEvent_Payload } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Payload";
import { IFrameProxyMutationEvent_Payload } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/FrameProxyMutationEvent/IFrameProxyMutationEvent_Payload";
import { IDataStateOfFrame } from "../States/IDataStateOfFrame";
import { DefaultStateOfFrame } from "../../../Classes/Defaults/DefaultStateOfFrame";

export class CEFrameProxy extends FrameProxy {
  ContentEditorProxy: ContentEditorProxy;
  ContentEditorProxyMutationEvent_Observer: ContentEditorProxyMutationEvent_Observer;
  SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement, nickName: string, settingsAgent: ISettingsAgent) {
    super(logger, iframeElem, nickName, settingsAgent);
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

      let recipeBasic = new RecipeBasics(this.Logger, this.SettingsAgent);
      let initResultFrameProxy = new InitResultsFrameProxy();

      await recipeBasic.WaitForPageReadyHtmlIframeElement(this.IframeElem)
        .then(() => this.ContentEditorProxy = new ContentEditorProxy(this.GetContentDoc(), this.Logger, this.SettingsAgent))
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