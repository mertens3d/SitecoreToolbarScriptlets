import { IStateOfGenericFrame } from "./IStateOfDTFrame";
import { IStateOf_ } from "./IStateOf_";


export interface IStateOfDTArea extends IStateOf_ {
  ActiveFrameIndex: number;
  //DTFrames: IStateOfGenericFrame[];
}