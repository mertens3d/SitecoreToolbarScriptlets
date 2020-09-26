import { IDataOneDoc } from "./Data/IDataOneDoc";
import { _BaseFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy";

export interface IFactoryHelper {
  BaseFramePromiseFactory(arg0: HTMLIFrameElement, arg1: string);
  DataOneContentDocFactoryFromIframe(toReturnIframeData: _BaseFrameProxy): IDataOneDoc;
  DTFrameProxyFactory(arg0: HTMLIFrameElement):  Promise<_BaseFrameProxy>;
}