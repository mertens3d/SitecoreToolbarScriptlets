import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { CEFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";

export interface IDataPublishChain {
  TopScDocumentProxy: DocumentJacket,
  Iframe0BlueScContentIFrameId0: CEFrameProxy;
  ScDocumentProxyToPublish: DocumentJacket
  JqIframe: CEFrameProxy;
  CEFrameRed: CEFrameProxy;
}