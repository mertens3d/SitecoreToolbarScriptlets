import { IDataStateOfFrame } from "./States/IDataStateOfFrame";

export interface IDataStateOfDesktop {
  IndexOfActiveFrame: number;
  StateOfFrames: IDataStateOfFrame[];
}