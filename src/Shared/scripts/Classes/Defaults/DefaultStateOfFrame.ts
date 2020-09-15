import { IDataStateOfDTFrame } from "../../Interfaces/Data/States/IDataStateOfDTFrame";
import { DefaultStateOfContentEditor } from "./DefaultStateOfContentEditor";
import { ScWindowType } from "../../Enums/scWindowType";
import { Guid } from "../../Helpers/Guid";

export class DefaultStateOfFrame implements IDataStateOfDTFrame {
  StateOfContentEditor = new DefaultStateOfContentEditor();
  StorageId = Guid.NewRandomGuid();
  Styling = null;
  WindowType: ScWindowType;
  ZIndex: number;
}
