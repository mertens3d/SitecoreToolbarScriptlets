import { IStateOfScContentTreeNodeDeep } from "../../Interfaces/StateOf/IStateOfScContentTreeNode";
import { IScContentTreeNodeCoord } from "../../Interfaces/StateOf/IScContentTreeNodeCoord";
import { IStateOfContentTree } from "../../Interfaces/StateOf/IStateOfContentTree";
import { IStateOfScContentTreeNodeShallow } from "../../Interfaces/StateOf/IStateOfScContentTreeNodeShallow";

export class DefaultStateOfContentTree implements IStateOfContentTree {
  ActiveNodeShallow: IStateOfScContentTreeNodeShallow = null;

  //ActiveNodeCoord: IScContentTreeNodeCoord = {
  //  LevelIndex: -1,
  //  LevelWidth: -1,
  //  SiblingIndex: -1
  //}
  ContentTreeNodeDeep: IStateOfScContentTreeNodeDeep = null;
}