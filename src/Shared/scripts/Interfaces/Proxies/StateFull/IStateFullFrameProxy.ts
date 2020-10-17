
export interface IStateFullFrameProxy {
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}