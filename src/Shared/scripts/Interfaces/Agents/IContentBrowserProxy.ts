import { DefaultMsgContentToController } from "../../Classes/DefaultMsgContentToController";
import { IMessageControllerToContent } from "../IMessageControllerToContent";
import { IBaseBrowserProxy } from "./IBaseBrowserProxy";
import { BrowserTabProxy } from "../../Proxies/Browser/BrowserTabProxy";

export interface IContentBrowserProxy extends IBaseBrowserProxy {
  ActiveBrowserTabProxy: BrowserTabProxy;
  //TabWaitForReadyStateCompleteNative(targetTab: any);
  InitAsyncProperties(): Promise<void>;
  AddListenerForPopUp(callback: (request: IMessageControllerToContent) => Promise<DefaultMsgContentToController>):void;
}