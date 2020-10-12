import { IRootState } from "../../Interfaces/Data/States/IStateOfScWindow";
import { DefaultStateOfStateFullProxy } from "./DefaultStateOfStateFullProxy";

export class DefaultStateOfScWindow implements IRootState {
  ScWindow = new DefaultStateOfStateFullProxy();
}