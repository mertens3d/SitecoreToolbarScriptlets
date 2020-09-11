import { IDataOneDoc } from "./Data/IDataOneDoc";
import { FrameProxy } from "./Data/IDataOneIframe";

export interface IFactoryHelper {
  DataOneContentDocFactoryFromIframe(toReturnIframeData: FrameProxy): IDataOneDoc;
  DataOneIframeFactory(arg0: HTMLIFrameElement, iframeNickName: string):  Promise<FrameProxy>;
}