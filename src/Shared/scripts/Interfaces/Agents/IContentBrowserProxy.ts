import { DefaultMsgContentToController } from "../../Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../IMessageControllerToContent";

export interface IContentBrowserFacade {
  AddListener(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>);
}