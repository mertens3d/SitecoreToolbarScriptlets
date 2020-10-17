import { IRootState } from "../../Interfaces/StateOf/IStateOfScWindow";
import { DefaultStateOfStateFullProxy } from "./DefaultStateOfStateFullProxy";

export class DefaultStateOfScWindow implements IRootState {
  ScWindow = new DefaultStateOfStateFullProxy();
}