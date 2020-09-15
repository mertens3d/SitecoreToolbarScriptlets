import { ScWindowType } from "../../../Enums/scWindowType";
import { GuidData } from "../../../Helpers/GuidData";
import { IDataStateOfContentEditor } from "./IDataStateOfContentEditor";
import { FrameStyling } from "./IFrameStyling";

export interface IDataStateOfDTFrame {
  StateOfContentEditor: IDataStateOfContentEditor;
  StorageId: GuidData;
  Styling: FrameStyling;
  WindowType: ScWindowType;
  ZIndex: number
}