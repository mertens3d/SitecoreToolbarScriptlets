import { DefaultMsgContentToController } from "../../Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../IStateOfController";

export interface IContentBrowserProxy {
  AddListener(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>);
}