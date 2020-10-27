import { IStateOf_ } from "./IStateOf_";
import { IFrameJacketStyling } from "./IStateOfFrameStyling";
import { ScWindowType } from "../../Enums/50 - scWindowType";

export interface IStateOfGenericFrame extends IStateOf_ {
  FrameStyling: IFrameJacketStyling;
  WindowType: ScWindowType;
  ZIndex: number
}