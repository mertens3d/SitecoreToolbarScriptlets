import { IStateLessElemProxy } from "../StateLess/IStateLessElemProxy";

export interface IStateFullElemProxy extends IStateLessElemProxy {
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}