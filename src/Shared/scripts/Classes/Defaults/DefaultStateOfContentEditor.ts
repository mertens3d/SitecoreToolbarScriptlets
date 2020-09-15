import { IDataStateOfContentEditor } from "../../Interfaces/Data/States/IDataStateOfContentEditor";
import { IDataStateOfTree } from "../../Interfaces/Data/States/IDataStateOfTree";

export class DefaultStateOfContentEditor implements IDataStateOfContentEditor {
  StateOfTree: IDataStateOfTree;
  IsAlive: false;
}
