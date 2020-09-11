import { IDataOneDoc } from "../IDataOneDoc";
import { GuidData } from "../../../Helpers/GuidData";
import { Guid } from "../../../Helpers/Guid";
import { FactoryHelper } from "../../../Helpers/FactoryHelper";
import { LoggableBase } from "../../../../../Content/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../../Agents/ILoggerAgent";
import { RecipeBasics } from "../../../Classes/RecipeBasics";
import { IDataStateOfContentEditor } from "../IDataOneStorageOneTreeState";
import { ContentEditorProxy } from "../../../../../Content/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ISettingsAgent } from "../../Agents/ISettingsAgent";
import { IDataStateOfFrame } from "../States/IDataFrameState";

export class FrameProxy extends LoggableBase {
  Index: number = -1;
  IframeElem: HTMLIFrameElement = null;
  Id: GuidData = null;
  Nickname: string = null;
  private SettingsAgent: ISettingsAgent;
  ConEditProxy: ContentEditorProxy;

  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement, nickName: string, settingsAgent: ISettingsAgent) {
    super(logger);
    this.IframeElem = iframeElem;
    this.Id = Guid.NewRandomGuid();
    this.Nickname = nickName;
    this.SettingsAgent = settingsAgent;
  }

  async WaitForReady(): Promise<void> {
    try {
      let recipeBasic: RecipeBasics = new RecipeBasics(this.Logger, this.SettingsAgent);

      await recipeBasic.WaitForPageReadyHtmlIframeElement(this.IframeElem)
        .then(() => this.ConEditProxy = new ContentEditorProxy(this.GetContentDoc(), this.Logger, this.SettingsAgent, this.IframeElem.id));
    } catch (err) {
      throw (this.WaitForReady.name + ' ' + err);
    }
  }

  async SetStateFrame(oneTreeState: IDataStateOfFrame): Promise<void> {

    await this.ConEditProxy.SetStateTree(oneTreeState)
  }

  GetStateOfFrame(): IDataStateOfFrame {
    let toReturn: IDataStateOfFrame = {
      ContentEditorState: null
    }

    if (this.ConEditProxy) {
      toReturn.ContentEditorState = this.ConEditProxy.GetStateOfContentEditor();
    }

    return toReturn;
  }

  GetState(): IDataStateOfContentEditor {
    //todo - should this be checking for min value. There may be a different iframe that is not ce that is top

    let oneCeState: IDataStateOfContentEditor = this.ConEditProxy.GetStateTree();

    return oneCeState;
  }

  GetZindex(): number {
    let toReturn: number = -99;

    if (this.IframeElem && this.IframeElem.style && this.IframeElem.style.zIndex) {
      //toReturn = this.IframeElem.style.zIndex;
      toReturn = parseInt(this.IframeElem.style.zIndex);
    }

    return toReturn;
  }

  GetContentDoc(): IDataOneDoc {
    return new FactoryHelper(this.Logger, this.SettingsAgent).DataOneContentDocFactoryFromIframe(this);
  }
}