import { ScWindowType } from "../../../Enums/scWindowType";
import { GuidData } from "../../../Helpers/GuidData";
import { IStateOfContentEditor } from "./IStateOfContentEditor";
import { IStateOfFrameStyling } from "./IStateOfFrameStyling";

export interface IStateOfDTFrame {
  StateOfContentEditor: IStateOfContentEditor;

  StateOfFrameStyling: IStateOfFrameStyling;
  WindowType: ScWindowType;
  ZIndex: number
}