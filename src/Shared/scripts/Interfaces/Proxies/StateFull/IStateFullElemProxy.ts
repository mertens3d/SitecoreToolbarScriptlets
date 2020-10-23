import { IBaseScProxy } from "../IBaseScProxy";

export interface IStateFullElemProxy extends IBaseScProxy {
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}