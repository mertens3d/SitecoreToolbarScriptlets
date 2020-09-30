import { IStateOfDesktop } from "../../Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTArea } from "../../Interfaces/Data/States/IStateOfDTProxy";
import { DefaultStateOfDTArea } from "./DefaultStateOfDTArea";

export class DefaultStateOfDesktop implements IStateOfDesktop {
  StateOfDTArea: IStateOfDTArea = new DefaultStateOfDTArea();
}