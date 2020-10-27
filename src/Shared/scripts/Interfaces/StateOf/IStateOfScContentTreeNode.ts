import { GuidData } from "../../Helpers/GuidData";
import { IScContentTreeNodeLineage } from "../Data/IScContentTreeNodeLineage";
import { IScIcon } from "../Data/IScIcon";
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";
import { IStateOf_ } from "./IStateOf_";

export interface IStateOfScContentTreeNodeDeep extends IStateOf_ {
  Friendly: string;
  IconSrc: IScIcon;
  IsActive: Boolean;
  IsExpanded: Boolean;
  ItemId: GuidData;
  Coord: IScContentTreeNodeCoord;
  Lineage: IScContentTreeNodeLineage;
  Children: IStateOfScContentTreeNodeDeep[];
}