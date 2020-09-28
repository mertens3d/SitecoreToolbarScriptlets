import { IDataStateOfDesktop } from "../../Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfDesktopArea } from "../../Interfaces/Data/States/IDataStateOfDesktopArea";

export class DefaultStateOfDesktopArea implements IDataStateOfDesktopArea {
  StateOfDTFrames = [];
  IndexOfActiveFrame = -1
}

export class DefaultStateOfDesktop implements IDataStateOfDesktop {
  StateOfDTArea: IDataStateOfDesktopArea = new DefaultStateOfDesktopArea();
}