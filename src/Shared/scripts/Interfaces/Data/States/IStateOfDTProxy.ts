import { IStateOfDTFrameProxy } from "./IDataStateOfDTFrame";

export interface IStateOfDTAreaProxy {
  IndexOfActiveDTFrameProxy: number;
  StateOfDTFrameProxies: IStateOfDTFrameProxy[];
}