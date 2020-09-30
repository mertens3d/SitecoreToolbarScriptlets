import { IStateOfDTFrame } from "./IStateOfDTFrame";

export interface IStateOfDTArea {
  IndexOfActiveDTFrameProxy: number;
  StateOfDTFrames: IStateOfDTFrame[];
}