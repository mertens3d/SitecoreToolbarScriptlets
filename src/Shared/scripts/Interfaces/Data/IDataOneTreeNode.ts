import { GuidData } from "../../Helpers/GuidData";

export interface IDataStateOfTreeNode {
  IsActive: Boolean;
  IsExpanded: Boolean;
  NodeFriendly: string;
  NodeId: GuidData;
  Discriminator: string;
}