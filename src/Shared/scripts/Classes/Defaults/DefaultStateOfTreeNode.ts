﻿import { GuidData } from "../../Helpers/GuidData";
import { IDataStateOfScContentTreeNode } from "../../Interfaces/Data/States/IDataStateOfScContentTreeNode";

export class DefaultStateOfTreeNode implements IDataStateOfScContentTreeNode {
    IsActive = false;
    IsExpanded = false;
    FriendlyTreeNode = '';
    ItemId = new GuidData();
}
