import { IDataStateOfDesktop } from "../../Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfDTFrame } from "../../Interfaces/Data/States/IDataStateOfDTFrame";

export class DefaultStateOfDesktop implements IDataStateOfDesktop {
    IndexOfActiveFrame = -1;
    StateOfDTFrames: IDataStateOfDTFrame[] = [];
}
