import { IStateOfContentTree } from "../../Interfaces/StateOf/IStateOfContentTree";
import { IStateOfScContentTreeNodeDeep } from "../../Interfaces/StateOf/IStateOfScContentTreeNode";
import { IStateOfScContentTreeNodeShallow } from "../../Interfaces/StateOf/IStateOfScContentTreeNodeShallow";

export class DefaultStateOfContentTree implements IStateOfContentTree {
  ActiveNodeShallow: IStateOfScContentTreeNodeShallow = null;
  ContentTreeNodeDeep: IStateOfScContentTreeNodeDeep = null;
}