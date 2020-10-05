import { IStateOfScWindow } from "../../Interfaces/Data/States/IStateOfScWindow";
import { DefaultStateOfStateFullProxy } from "./DefaultStateOfStateFullProxy";

export class DefaultStateOfScWindow implements IStateOfScWindow {
  StateOf_ = new DefaultStateOfStateFullProxy();
}