import { ScWindowType } from "../../../Enums/5000 - scWindowType";
import { IStateOf_ } from "./IStateOf_";
import { IFrameJacketStyling } from "./IStateOfFrameStyling";

export interface IStateOfDTFrame {
  StateOfFrameStyling: IFrameJacketStyling;
  StateOfHosted: IStateOf_;
  WindowType: ScWindowType;
  ZIndex: number
}