import { IStateOfDTFrame } from "../../Interfaces/StateOf/IStateOfDTFrame";
import { IStateOfDTArea } from "../../Interfaces/StateOf/IStateOfDTProxy";

export class DefaultStateOfDTArea implements IStateOfDTArea {
  DTFrames: IStateOfDTFrame[] = [];
  ActiveFrameIndex = -1;
}