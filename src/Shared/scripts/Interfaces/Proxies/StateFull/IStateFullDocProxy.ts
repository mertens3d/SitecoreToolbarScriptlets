import { IBaseScDocProxy } from "../IBaseScDocProxy";
import { IStateFullElemProxy } from "./IStateFullElemProxy";

export interface IStateFullDocProxy extends IBaseScDocProxy {
  GetState(): Promise<any>;
  SetState(state: any): Promise<any>;
 
}