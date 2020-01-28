import { IGuid } from "./IGuid";

export interface IDataOneTreeNode {
    IsActive: Boolean;
    IsExpanded: Boolean;
    NodeFriendly: string;
    NodeId: IGuid;
}
