import { IContentBrowserProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentBrowserProxy";
import { MsgContentToController } from "../../../Shared/scripts/Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../../../Shared/scripts/Interfaces/IStateOfController";
import { LoggableBase } from "../../../HindSiteScUiProxy/scripts/Managers/LoggableBase";

export class ContentBrowserProxy extends LoggableBase implements IContentBrowserProxy {
  AddListener(callback: (request: IMessageControllerToContent) => Promise<MsgContentToController>) {
    browser.runtime.onMessage.addListener((request: IMessageControllerToContent) => callback(request));
  }
}