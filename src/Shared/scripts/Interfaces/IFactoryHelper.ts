import { IDataOneDoc } from "./Data/IDataOneDoc";
import { IframeProxy } from "./Data/IDataOneIframe";

export interface IFactoryHelper {
  DataOneContentDocFactoryFromIframe(toReturnIframeData: IframeProxy): IDataOneDoc;
  DataOneIframeFactory(arg0: HTMLIFrameElement, iframeNickName: string): IframeProxy;
}