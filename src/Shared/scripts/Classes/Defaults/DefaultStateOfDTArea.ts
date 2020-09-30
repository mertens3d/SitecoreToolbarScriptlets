import { IStateOfDTArea } from "../../Interfaces/Data/States/IStateOfDTProxy";

export class DefaultStateOfDTArea implements IStateOfDTArea {
    StateOfDTFrames = [];
    IndexOfActiveDTFrameProxy = -1;
}
