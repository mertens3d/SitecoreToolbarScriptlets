import { ScDocumentFacade } from "../../../HindSiteScUiProxy/scripts/Proxies/ScDocumentFacade";
import { DTFrameProxy } from "../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";

export interface IFactoryHelper {
  BaseFramePromiseFactory(arg0: HTMLIFrameElement, arg1: string);
  //DataOneContentDocFactoryFromIframe(toReturnIframeData: DTFrameProxy): ScDocumentProxy;
  DTFrameProxyFactory(arg0: HTMLIFrameElement):  Promise<DTFrameProxy>;
}