import { GuidData } from "../../../Helpers/GuidData";
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";
import { IScContentTreeNodeLineage } from "../IScContentTreeNodeLineage";
import { IScIcon } from "../IScIcon";

export interface IStateOfScContentTreeNodeShallow {
  Friendly: string;
  IconSrc: IScIcon;
  IsActive: Boolean;
  IsExpanded: Boolean;
  ItemId: GuidData;
  Coord: IScContentTreeNodeCoord;
  Lineage: IScContentTreeNodeLineage;
}