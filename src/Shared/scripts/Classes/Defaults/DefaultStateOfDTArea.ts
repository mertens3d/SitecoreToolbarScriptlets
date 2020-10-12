import { IStateOfDTArea } from "../../Interfaces/Data/States/IStateOfDTProxy";

export class DefaultStateOfDTArea implements IStateOfDTArea {
    DTFrames = [];
    ActiveFrameIndex = -1;
}
