import { IDataOneDoc } from "./IDataOneDoc";
import { GuidData } from "../../Helpers/GuidData";
import { Guid } from "../../Helpers/Guid";
import { FactoryHelper } from "../../Helpers/FactoryHelper";
import { LoggableBase } from "../../../../Content/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../Agents/ILoggerAgent";
import { RecipeBasics } from "../../Classes/RecipeBasics";

export class IframeProxy extends LoggableBase {
  Index: number = -1;
  IframeElem: HTMLIFrameElement = null;
  Id: GuidData = null;
  Nickname: string = null;

  constructor(logger: ILoggerAgent, iframeElem: HTMLIFrameElement, nickName: string) {
    super(logger);
    this.IframeElem = iframeElem;
    this.Id = Guid.NewRandomGuid();
    this.Nickname = nickName;
  }

  async WaitForReady(): Promise<void> {
    try {
      let recipeBasic: RecipeBasics = new RecipeBasics(this.Logger);

      await recipeBasic.WaitForPageReadyHtmlIframeElement(this.IframeElem)
    } catch (err) {
      throw (this.WaitForReady.name + ' ' + err);
    }
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
    return new FactoryHelper(this.Logger).DataOneContentDocFactoryFromIframe(this);
  }
}