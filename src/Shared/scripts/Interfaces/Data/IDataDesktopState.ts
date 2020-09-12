import { IDataStateOfContentEditor } from "./IDataOneStorageOneTreeState";
import { IDataStateOfFrame } from "./States/IDataStateOfFrame";

export interface IDataStateOfDesktop {
  StateOfActiveFrame: IDataStateOfFrame;
  StateOfFrames: IDataStateOfFrame[];
}