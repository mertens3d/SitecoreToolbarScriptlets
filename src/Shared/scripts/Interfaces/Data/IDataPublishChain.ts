import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IScFrameProxy } from "../ScProxies/IStateFullFrameProxy";

export interface IDataPublishChain {
  TopScDocumentProxy: DocumentJacket,
  Iframe0BlueScContentIFrameId0: IScFrameProxy;
  ScDocumentProxyToPublish: DocumentJacket
  JqIframe: IScFrameProxy;
  CEFrameRed: IScFrameProxy;
}