import { IDataOneDoc } from "./IDataOneDoc";
import { IDataOneIframe } from "./IDataOneIframe";

export interface IFactoryHelper {
  DataOneContentDocFactoryFromIframe(toReturnIframeData: IDataOneIframe): IDataOneDoc;
  DataOneIframeFactory(arg0: HTMLIFrameElement, iframeNickName: string): IDataOneIframe;
}