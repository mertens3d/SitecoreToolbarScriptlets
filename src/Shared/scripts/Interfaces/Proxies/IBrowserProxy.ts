import { IMessageControllerToContent } from "../IMessageControllerToContent";
import { IMessageContentToController } from "../IMessageContentToController";
import { IBaseBrowserProxy } from "../Agents/IBaseBrowserProxy";

export interface IPopUpBrowserProxy extends IBaseBrowserProxy {
  SendMessageAsync_BrowserProxy(messageFromController: IMessageControllerToContent): Promise<IMessageContentToController>;
  Url: string;
}