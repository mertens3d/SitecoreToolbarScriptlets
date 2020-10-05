import { IStateOfDTArea } from "./IStateOfDTProxy";
import { IStateOf_ } from "./IStateofX";

export interface IStateOfDesktop extends IStateOf_{
  StateOfDTArea: IStateOfDTArea;
}