import { GuidData } from "../../Helpers/GuidData";
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";
import { IScContentTreeNodeLineage } from "../Data/IScContentTreeNodeLineage";
import { IScIcon } from "../Data/IScIcon";

export interface IStateOfScContentTreeNodeShallow {
  Friendly: string;
  IconSrc: IScIcon;
  IsActive: Boolean;
  IsExpanded: Boolean;
  ItemId: GuidData;
  Coord: IScContentTreeNodeCoord;
  Lineage: IScContentTreeNodeLineage;
}