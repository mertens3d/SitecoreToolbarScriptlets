import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IStateOfController";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";

export class ContentBrowserProxy extends LoggableBase implements IContentBrowserProxy {
  AddListener(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>) {
    browser.runtime.onMessage.addListener((request: IMessageControllerToContent) => callback(request));
  }
}