import { IMessageControllerToContent } from "../IStateOfController";
import { IMessageContentToController } from "../IMsgPayload";

export interface IPopUpBrowserProxy {
  SendMessageAsync_BrowserProxy(messageFromController: IMessageControllerToContent): Promise<IMessageContentToController>;
  Url: string;
}