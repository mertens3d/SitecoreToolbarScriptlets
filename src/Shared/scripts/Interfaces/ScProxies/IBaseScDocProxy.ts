import { IBaseScProxy } from "./IBaseScProxy";

export interface IScDocProxy extends IBaseScProxy{
  OnFocus(): Promise<any>
  EnableWatcherForFrames(): void;
}