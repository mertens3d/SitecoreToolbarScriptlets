import { DefaultMsgContentToController } from "../../Classes/DefaultMsgContentToController";
import { BrowserTabProxy } from "../../Proxies/Browser/BrowserTabProxy";
import { IMessageControllerToContent } from "../IMessageControllerToContent";
import { IBaseBrowserProxy } from "../ScProxies/IBaseBrowserProxy";

export interface IContentBrowserProxy extends IBaseBrowserProxy {
  ActiveBrowserTabProxy: BrowserTabProxy;
  //TabWaitForReadyStateCompleteNative(targetTab: any);
  InitAsyncProperties(): Promise<void>;
  AddListenerForPopUp(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>):void;
}