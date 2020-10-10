import { IStateOfDTArea } from "./IStateOfDTProxy";
import { IStateOf_ } from "./IStateOf_";

export interface IStateOfDesktop extends IStateOf_{
  DTArea: IStateOfDTArea;
}