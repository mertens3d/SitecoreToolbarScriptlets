import { Guid } from "../Helpers/Guid";

export interface IDataOneTreeNode {
    IsActive: Boolean;
    IsExpanded: Boolean;
    NodeFriendly: string;
    NodeId: Guid;
}
