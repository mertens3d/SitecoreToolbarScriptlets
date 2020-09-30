import { IMessageControllerToContent } from "../IMessageControllerToContent";
import { IMessageContentToController } from "../IMessageContentToController";

export interface IPopUpBrowserProxy {
  SendMessageAsync_BrowserProxy(messageFromController: IMessageControllerToContent): Promise<IMessageContentToController>;
  Url: string;
}