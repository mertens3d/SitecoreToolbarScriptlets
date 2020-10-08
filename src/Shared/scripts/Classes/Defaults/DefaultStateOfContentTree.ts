import { IStateOfScContentTreeNodeDeep } from "../../Interfaces/Data/States/IStateOfScContentTreeNode";
import { IScContentTreeNodeCoord } from "../../Interfaces/Data/States/IScContentTreeNodeCoord";
import { IStateOfContentTree } from "../../Interfaces/Data/States/IStateOfContentTree";
import { IStateOfScContentTreeNodeShallow } from "../../Interfaces/Data/States/IStateOfScContentTreeNodeFlat";

export class DefaultStateOfContentTree implements IStateOfContentTree {
  ActiveNodeFlat: IStateOfScContentTreeNodeShallow = null;

  //ActiveNodeCoord: IScContentTreeNodeCoord = {
  //  LevelIndex: -1,
  //  LevelWidth: -1,
  //  SiblingIndex: -1
  //}
  StateOfScContentTreeNodeDeep: IStateOfScContentTreeNodeDeep = null;
}