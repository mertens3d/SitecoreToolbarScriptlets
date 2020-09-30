import { IStateOfScWindow } from "../../Interfaces/Data/States/IStateOfScWindow";
import { DefaultStateOfDesktop } from "./DefaultStateOfDesktop";
import { DefaultStateOfContentEditor } from "./DefaultStateOfContentEditor";

export class DefaultStateOfScWindowProxy implements IStateOfScWindow {
    StateOfContentEditor = new DefaultStateOfContentEditor;
    StateOfDesktop = new DefaultStateOfDesktop();
}
