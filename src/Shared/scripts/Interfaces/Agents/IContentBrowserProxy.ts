import { DefaultMsgContentToController } from "../../Classes/MsgPayloadResponseFromContent";
import { IMessageControllerToContent } from "../IMessageControllerToContent";
import { IBaseBrowserProxy } from "./IBaseBrowserProxy";
import { BrowserTabProxy } from "../../Proxies/Browser/BrowserTabProxy";

export interface IContentBrowserProxy extends IBaseBrowserProxy {
  ActiveBrowserTabProxy: BrowserTabProxy;
  //TabWaitForReadyStateCompleteNative(targetTab: any);
  InitAsyncProperties(): Promise<void>;
  AddListener(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>);
}