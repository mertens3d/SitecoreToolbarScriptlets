import { GuidData } from "../../../Helpers/GuidData";
import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";
import { IScContentTreeNodeLineage } from "../IScContentTreeNodeLineage";

export interface IStateOfScContentTreeNodeShallow {
    Friendly: string;
    IconSrc: string;
    IsActive: Boolean;
    IsExpanded: Boolean;
    ItemId: GuidData;
    //MainIconSrc: string;
    Coord: IScContentTreeNodeCoord;
    Lineage: IScContentTreeNodeLineage;
}
