import { IDataOneDoc } from "./IDataOneDoc";
import { FrameProxy } from "./Proxies/FrameProxy";

export interface IDataPublishChain {
  TopLevelDoc: IDataOneDoc,
  Iframe0Blue: FrameProxy;
  DocToPublish: IDataOneDoc
  JqIframe: FrameProxy;
  MessageDialogIframeRed: FrameProxy;
}