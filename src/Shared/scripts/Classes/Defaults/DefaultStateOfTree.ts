import { IDataStateOfTree } from "../../Interfaces/Data/States/IDataStateOfTree";
import { IDataStateOfScContentTreeNode } from "../../Interfaces/Data/States/IDataStateOfScContentTreeNode";

export class DefaultStateOfTree implements IDataStateOfTree {
    ActiveTreeNodeIndex =-1;
    StateOfTreeNodes: IDataStateOfScContentTreeNode[];
}
