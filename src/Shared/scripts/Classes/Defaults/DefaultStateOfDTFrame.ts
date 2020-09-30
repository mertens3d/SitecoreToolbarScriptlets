import { IStateOfDTFrame } from "../../Interfaces/Data/States/IStateOfDTFrame";
import { DefaultStateOfContentEditor } from "./DefaultStateOfContentEditor";
import { ScWindowType } from "../../Enums/scWindowType";
import { Guid } from "../../Helpers/Guid";

export class DefaultStateOfDTFrame implements IStateOfDTFrame {
    StateOfContentEditor = new DefaultStateOfContentEditor();
    StateOfFrameStyling = null;
    StorageId = Guid.NewRandomGuid();
    WindowType: ScWindowType;
    ZIndex: number;
}
