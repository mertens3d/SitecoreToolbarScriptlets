import { IDataOneDoc } from "./Data/IDataOneDoc";
import { FrameProxy } from "./Data/Proxies/FrameProxy";

export interface IFactoryHelper {
  DataOneContentDocFactoryFromIframe(toReturnIframeData: FrameProxy): IDataOneDoc;
  DataOneIframeFactory(arg0: HTMLIFrameElement, iframeNickName: string):  Promise<FrameProxy>;
}