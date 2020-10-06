import { ScWindowType } from "../../../Enums/scWindowType";
import { IStateOf_ } from "./IStateofX";
import { IStateOfFrameStyling } from "./IStateOfFrameStyling";

export interface IStateOfDTFrame {
  StateOfFrameStyling: IStateOfFrameStyling;
  StateOfHosted: IStateOf_;
  WindowType: ScWindowType;
  ZIndex: number
}