import { IDataOneDoc } from "./Data/IDataOneDoc";
import { FrameProxy } from "./Data/Proxies/FrameProxy";

export interface IFactoryHelper {
  FrameProxyForPromiseFactory(arg0: HTMLIFrameElement, arg1: string);
  DataOneContentDocFactoryFromIframe(toReturnIframeData: FrameProxy): IDataOneDoc;
  FrameProxyForDesktopFactory(arg0: HTMLIFrameElement, iframeNickName: string):  Promise<FrameProxy>;
}