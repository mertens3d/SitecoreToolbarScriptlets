import { IDataOneDoc } from "./Data/IDataOneDoc";
import { _BaseFrameProxy } from "../../../Content/scripts/Proxies/_BaseFrameProxy";

export interface IFactoryHelper {
  FrameProxyForPromiseFactory(arg0: HTMLIFrameElement, arg1: string);
  DataOneContentDocFactoryFromIframe(toReturnIframeData: _BaseFrameProxy): IDataOneDoc;
  CEFrameProxyFactory(arg0: HTMLIFrameElement):  Promise<_BaseFrameProxy>;
}