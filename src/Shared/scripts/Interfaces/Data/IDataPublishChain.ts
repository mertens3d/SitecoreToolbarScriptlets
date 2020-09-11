import { FrameProxy } from "./IDataOneIframe";
import { IDataOneDoc } from "./IDataOneDoc";

export interface IDataPublishChain {
  TopLevelDoc: IDataOneDoc,
  Iframe0Blue: FrameProxy;
  docToPublish: IDataOneDoc
  jqIframe: FrameProxy;
  messageDialogIframeRed: FrameProxy;
}