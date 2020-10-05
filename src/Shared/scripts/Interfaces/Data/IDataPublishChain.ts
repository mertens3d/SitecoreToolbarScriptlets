import { CEFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";
import { ScDocumentFacade } from "../../../../HindSiteScUiProxy/scripts/Proxies/ScDocumentFacade";

export interface IDataPublishChain {
  TopScDocumentProxy: ScDocumentFacade,
  Iframe0Blue: CEFrameProxy;
  ScDocumentProxyToPublish: ScDocumentFacade
  JqIframe: CEFrameProxy;
  CEFrameRed: CEFrameProxy;
}