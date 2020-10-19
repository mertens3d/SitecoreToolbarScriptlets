
export interface IStateFullFrameProxy {
  WaitForCompleteNABFrameProxyOrReject(): any;
  GetDocumentJacket();
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}