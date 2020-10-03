import { ScDocumentProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/ScDocumentProxy";
import { DTFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy";

export interface IDataPublishChain {
  TopLevelDoc: ScDocumentProxy,
  Iframe0Blue: DTFrameProxy;
  DocToPublish: ScDocumentProxy
  JqIframe: DTFrameProxy;
  MessageDialogIframeRed: DTFrameProxy;
}