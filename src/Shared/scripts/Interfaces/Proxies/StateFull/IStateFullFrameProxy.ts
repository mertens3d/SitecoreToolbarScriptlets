import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { DocReadyState } from "../../../Enums/ReadyState";
import { IStateOf_ } from "../../StateOf/IStateOf_";

export interface IStateFullFrameProxy extends IStateOf_{
  WaitForCompleteNABFrameProxyOrReject(): Promise<DocReadyState> ;
  GetDocumentJacket(): DocumentJacket;
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}