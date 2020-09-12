import { IDataStateOfDesktop } from "../../Interfaces/Data/IDataDesktopState";
import { IDataStateOfFrame } from "../../Interfaces/Data/States/IDataStateOfFrame";
import { DefaultStateOfFrame } from "./DefaultStateOfFrame";

export class DefaultStateOfDesktop implements IDataStateOfDesktop {
    StateOfActiveFrame = new DefaultStateOfFrame();
    StateOfFrames: IDataStateOfFrame[];
}
