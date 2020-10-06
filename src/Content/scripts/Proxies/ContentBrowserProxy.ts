import { IContentBrowserFacade } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { DefaultMsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IMessageControllerToContent";
import { _HindeCoreBase } from "../../../Shared/scripts/LoggableBase";

export class ContentBrowserFacade extends _HindeCoreBase implements IContentBrowserFacade {
  AddListener(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>) {
    browser.runtime.onMessage.addListener((request: IMessageControllerToContent) => callback(request));
  }
}