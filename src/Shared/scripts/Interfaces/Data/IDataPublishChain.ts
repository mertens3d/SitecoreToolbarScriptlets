import { IDataOneDoc } from "./IDataOneDoc";
import { _BaseFrameProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/_BaseFrameProxy";

export interface IDataPublishChain {
  TopLevelDoc: IDataOneDoc,
  Iframe0Blue: _BaseFrameProxy;
  DocToPublish: IDataOneDoc
  JqIframe: _BaseFrameProxy;
  MessageDialogIframeRed: _BaseFrameProxy;
}