import { IBaseScProxy } from "./IBaseScProxy";

export interface IScElemProxy extends IBaseScProxy {
  GetZindexAsInt(): number;
}