import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IStateFullFrameProxy } from "../Proxies/StateFull/IStateFullFrameProxy";

export interface IDataPublishChain {
  TopScDocumentProxy: DocumentJacket,
  Iframe0BlueScContentIFrameId0: IStateFullFrameProxy;
  ScDocumentProxyToPublish: DocumentJacket
  JqIframe: IStateFullFrameProxy;
  CEFrameRed: IStateFullFrameProxy;
}