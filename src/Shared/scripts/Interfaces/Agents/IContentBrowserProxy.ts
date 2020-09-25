import { MsgContentToController } from "../../Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../IStateOfController";

export interface IBrowserTab {
    status();
}
export interface IContentBrowserProxy {
  BrowserTabsUpdate(AbsUrl: string);
  AddListener(callback: (request: IMessageControllerToContent) => Promise<MsgContentToController>);
}