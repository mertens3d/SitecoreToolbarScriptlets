import { IDataStateOfScContentTreeNode } from "../../Interfaces/Data/IDataOneTreeNode";
import { IDataStateOfTree } from "../../Interfaces/Data/iDataTreeState";

export class DefaultStateOfTree implements IDataStateOfTree {
    ActiveTreeNodeIndex =-1;
    StateOfTreeNodes: IDataStateOfScContentTreeNode[];
}
