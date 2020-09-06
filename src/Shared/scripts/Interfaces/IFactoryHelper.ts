import { IDataOneDoc } from "./Data/IDataOneDoc";
import { IDataOneIframe } from "./Data/IDataOneIframe";

export interface IFactoryHelper {
  DataOneContentDocFactoryFromIframe(toReturnIframeData: IDataOneIframe): IDataOneDoc;
  DataOneIframeFactory(arg0: HTMLIFrameElement, iframeNickName: string): IDataOneIframe;
}