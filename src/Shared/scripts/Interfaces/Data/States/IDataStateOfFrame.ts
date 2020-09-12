import { IDataStateOfContentEditor } from "../IDataOneStorageOneTreeState";
import { ScWindowType } from "../../../Enums/scWindowType";

export interface IDataStateOfFrame {
  StateOfContentEditor: IDataStateOfContentEditor;
  Style: string;
  WindowType: ScWindowType;
  ZIndex: number
}