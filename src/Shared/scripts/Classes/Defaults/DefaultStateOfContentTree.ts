import { IStateOfScContentTreeNodeDeep } from "../../Interfaces/Data/States/IStateOfScContentTreeNode";
import { IScContentTreeNodeCoord } from "../../Interfaces/Data/States/IScContentTreeNodeCoord";
import { IStateOfContentTree } from "../../Interfaces/Data/States/IStateOfContentTree";

export class DefaultStateOfContentTree implements IStateOfContentTree {
  ActiveNodeCoord: IScContentTreeNodeCoord = {
    LevelIndex: -1,
    LevelWidth: -1,
    SiblingIndex: -1
  }
  StateOfScContentTreeNode: IStateOfScContentTreeNodeDeep = null;
}