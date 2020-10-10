import { ScWindowType } from "../../../Enums/50 - scWindowType";
import { IStateOf_ } from "./IStateOf_";
import { IFrameJacketStyling } from "./IStateOfFrameStyling";

export interface IStateOfDTFrame {
  FrameStyling: IFrameJacketStyling;
  HostedFrame: IStateOf_;
  WindowType: ScWindowType;
  ZIndex: number
}