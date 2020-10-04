import { ScDocumentProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/ScDocumentProxy";
import { DTFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";
import { CEFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/CEFrameProxy";

export interface IDataPublishChain {
  TopScDocumentProxy: ScDocumentProxy,
  Iframe0Blue: CEFrameProxy;
  DocToPublish: ScDocumentProxy
  JqIframe: CEFrameProxy;
  MessageDialogIframeRed: CEFrameProxy;
}