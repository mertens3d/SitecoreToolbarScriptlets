import { GuidData } from "../../Helpers/GuidData";
import { IDataStateOfTreeNode } from "../../Interfaces/Data/IDataOneTreeNode";
import { SharedConst } from "../../SharedConst";

export class DefaultStateOfTreeNode implements IDataStateOfTreeNode {
    IsActive = false;
    IsExpanded = false;
    NodeFriendly = '';
    NodeId = new GuidData();
    Discriminator = SharedConst.Const.ObjDiscriminator.DataOneTreeNode;
}
