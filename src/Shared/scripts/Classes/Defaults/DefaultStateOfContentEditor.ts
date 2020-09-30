import { IStateOfContentEditor } from "../../Interfaces/Data/States/IStateOfContentEditor";
import { DefaultStateOfContentTree } from "./DefaultStateOfContentTree";

export class DefaultStateOfContentEditor implements IStateOfContentEditor {
  StateOfContentTree = new DefaultStateOfContentTree();
  
}
