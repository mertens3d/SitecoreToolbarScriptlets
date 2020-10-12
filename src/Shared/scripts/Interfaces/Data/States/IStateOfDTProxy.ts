import { IStateOfDTFrame } from "./IStateOfDTFrame";

export interface IStateOfDTArea {
  ActiveFrameIndex: number;
  DTFrames: IStateOfDTFrame[];
}