import { IBaseScDocProxy } from "../IBaseScDocProxy";

export interface IStateFullDocProxy extends IBaseScDocProxy {
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
}