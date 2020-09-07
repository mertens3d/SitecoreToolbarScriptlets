import { IframeProxy } from "./IDataOneIframe";
import { IDataOneDoc } from "./IDataOneDoc";

export interface IDataPublishChain {
  TopLevelDoc: IDataOneDoc,
  Iframe0Blue: IframeProxy;
  docToPublish: IDataOneDoc
  jqIframe: IframeProxy;
  messageDialogIframeRed: IframeProxy;
}