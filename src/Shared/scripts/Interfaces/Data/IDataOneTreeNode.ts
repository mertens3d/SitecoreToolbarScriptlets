import { GuidData } from "../../Helpers/GuidData";

export interface IDataOneTreeNode {
  IsActive: Boolean;
  IsExpanded: Boolean;
  NodeFriendly: string;
  NodeId: GuidData;
  Discriminator: string;
}