﻿import { IStateOf_ } from "./IStateOf_";
import { IFrameJacketStyling } from "./IStateOfFrameStyling";
import { ScWindowType } from "../../Enums/50 - scWindowType";

export interface IStateOfDTFrame {
  FrameStyling: IFrameJacketStyling;
  StateOfHostedProxies: IStateOf_[];
  WindowType: ScWindowType;
  ZIndex: number
}