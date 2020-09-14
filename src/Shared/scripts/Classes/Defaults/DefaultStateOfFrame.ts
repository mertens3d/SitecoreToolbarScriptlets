import { IDataStateOfFrame } from "../../Interfaces/Data/States/IDataStateOfFrame";
import { DefaultStateOfContentEditor } from "./DefaultStateOfContentEditor";
import { ScWindowType } from "../../Enums/scWindowType";
import { Guid } from "../../Helpers/Guid";

export class DefaultStateOfFrame implements IDataStateOfFrame {
  StateOfContentEditor = new DefaultStateOfContentEditor();
  StorageId = Guid.NewRandomGuid();
  Styling = null;
  WindowType: ScWindowType;
  ZIndex: number;
}
