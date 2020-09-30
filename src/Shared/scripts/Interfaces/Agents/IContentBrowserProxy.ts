import { DefaultMsgContentToController } from "../../Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../IMessageControllerToContent";

export interface IContentBrowserProxy {
  AddListener(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>);
}