import { ScWindowType } from "../../../Enums/scWindowType";
import { GuidData } from "../../../Helpers/GuidData";
import { IDataStateOfContentEditor } from "./IDataStateOfContentEditor";

export interface IDataStateOfFrame {
  StateOfContentEditor: IDataStateOfContentEditor;
  StorageId: GuidData;
  Styling: string;
  WindowType: ScWindowType;
  ZIndex: number
}