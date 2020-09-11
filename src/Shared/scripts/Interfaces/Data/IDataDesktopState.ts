import { IDataStateOfContentEditor } from "./IDataOneStorageOneTreeState";
import { IDataStateOfFrame } from "./States/IDataFrameState";

export interface IDataSateOfDesktop {
  ActiveCeState: IDataStateOfContentEditor;
  FrameStates: IDataStateOfFrame[];
}