import { GuidData } from "../../../Helpers/GuidData";
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";

export interface IStateOfScContentTreeNode {
  Children: IStateOfScContentTreeNode[];
  Coord: IScContentTreeNodeCoord;
  FriendlyTreeNode: string;
  IconSrc: string;
  IsActive: Boolean;
  IsExpanded: Boolean;
  ItemId: GuidData;
  MainIconSrc: string;
}