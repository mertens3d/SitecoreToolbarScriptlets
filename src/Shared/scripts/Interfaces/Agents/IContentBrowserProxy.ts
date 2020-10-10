import { DefaultMsgContentToController } from "../../Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../IMessageControllerToContent";
import { IBaseBrowserProxy } from "./IBaseBrowserProxy";
import { BrowserTabProxy } from "../../../../PopUpController/scripts/Proxies/BrowserTabProxy";

export interface IContentBrowserProxy extends IBaseBrowserProxy {
  ActiveBrowserTabProxy: BrowserTabProxy;
  //TabWaitForReadyStateCompleteNative(targetTab: any);
  InitAsyncProperties(): Promise<void>;
  AddListener(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>);
}