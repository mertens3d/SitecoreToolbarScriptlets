import { IDataStateOfDesktop } from "../../Interfaces/Data/IDataDesktopState";
import { IDataStateOfFrame } from "../../Interfaces/Data/States/IDataStateOfFrame";

export class DefaultStateOfDesktop implements IDataStateOfDesktop {
    IndexOfActiveFrame = -1;
    StateOfFrames: IDataStateOfFrame[] = [];
}
