import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { DocReadyState } from "../../../Enums/ReadyState";

export interface IStateFullFrameProxy {
  WaitForCompleteNABFrameProxyOrReject(): Promise<DocReadyState> ;
  GetDocumentJacket(): DocumentJacket;
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}