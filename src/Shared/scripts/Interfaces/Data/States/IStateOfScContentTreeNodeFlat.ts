import { GuidData } from "../../../Helpers/GuidData";
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";

export interface IStateOfScContentTreeNodeFlat {
  Friendly: string;
  IconSrc: string;
  IsActive: Boolean;
  IsExpanded: Boolean;
  ItemId: GuidData;
  MainIconSrc: string;
  Coord: IScContentTreeNodeCoord;
}