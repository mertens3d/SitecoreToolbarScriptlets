import { GuidData } from "../../Helpers/GuidData";
import { IDataStateOfScContentTreeNode } from "../../Interfaces/Data/IDataOneTreeNode";

export class DefaultStateOfTreeNode implements IDataStateOfScContentTreeNode {
    IsActive = false;
    IsExpanded = false;
    Friendly = '';
    ItemId = new GuidData();
}
