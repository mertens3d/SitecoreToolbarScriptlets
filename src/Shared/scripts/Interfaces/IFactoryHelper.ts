import { IStateFullFrameProxy } from "./Proxies/StateFull/IStateFullFrameProxy";

export interface IFactoryHelper {
  BaseFramePromiseFactory(arg0: HTMLIFrameElement, arg1: string);
  //DataOneContentDocFactoryFromIframe(toReturnIframeData: DTFrameProxy): ScDocumentProxy;
  DTFrameProxyFactory(arg0: HTMLIFrameElement): Promise<IStateFullFrameProxy>;
}