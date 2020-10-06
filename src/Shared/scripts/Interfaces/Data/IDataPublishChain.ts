import { DocumentJacket } from "../../../../DOMJacket/DocumentJacket";
import { CEFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";

export interface IDataPublishChain {
  TopScDocumentProxy: DocumentJacket,
  Iframe0Blue: CEFrameProxy;
  ScDocumentProxyToPublish: DocumentJacket
  JqIframe: CEFrameProxy;
  CEFrameRed: CEFrameProxy;
}