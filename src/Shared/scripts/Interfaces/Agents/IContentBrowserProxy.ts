import { MsgContentToController } from "../../Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../IStateOfController";

export interface IContentBrowserProxy {
  AddListener(callback: (request: IMessageControllerToContent) => Promise<MsgContentToController>);
}