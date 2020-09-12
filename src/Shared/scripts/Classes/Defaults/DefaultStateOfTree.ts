import { IDataStateOfTree } from "../../Interfaces/Data/iDataTreeState";
import { IDataStateOfTreeNode } from "../../Interfaces/Data/IDataOneTreeNode";
import { DefaultStateOfTreeNode } from "./DefaultStateOfTreeNode";

export class DefaultStateOfTree implements IDataStateOfTree {
    ActiveNode = new DefaultStateOfTreeNode();
    AllTreeNodeAr: IDataStateOfTreeNode[];
}
