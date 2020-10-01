import { IStateOfDTFrame } from "./IStateOfDTFrame";

export interface IStateOfDTArea {
  ActiveDTFrameIndex: number;
  StateOfDTFrames: IStateOfDTFrame[];
}