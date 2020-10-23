import { IBaseScProxy } from "./IBaseScProxy";

export interface IBaseScDocProxy extends IBaseScProxy{
  OnFocus(): Promise<any>
  EnableWatcherForFrames(): void;
}