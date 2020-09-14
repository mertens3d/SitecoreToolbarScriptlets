import { ScWindowType } from "../../../Enums/scWindowType";
import { GuidData } from "../../../Helpers/GuidData";
import { IDataStateOfContentEditor } from "./IDataStateOfContentEditor";


export interface IFrameStyling {

  position: string;
  left: string;
  top: string;
  width: string;
  height: string;
  zIndex: string;
}

export interface IDataStateOfFrame {
  StateOfContentEditor: IDataStateOfContentEditor;
  StorageId: GuidData;
  Styling: IFrameStyling;
  WindowType: ScWindowType;
  ZIndex: number
}