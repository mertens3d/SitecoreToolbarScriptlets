import { IStateOfDTArea } from "../../Interfaces/StateOf/IStateOfDTProxy";

export class DefaultStateOfDTArea implements IStateOfDTArea {
    DTFrames = [];
    ActiveFrameIndex = -1;
}
