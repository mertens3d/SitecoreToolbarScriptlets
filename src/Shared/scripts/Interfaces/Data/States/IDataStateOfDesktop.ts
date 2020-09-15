import { IDataStateOfFrame } from "./IDataStateOfFrame";

export interface IDataStateOfDesktop {
  IndexOfActiveFrame: number;
  StateOfFrames: IDataStateOfFrame[];
}