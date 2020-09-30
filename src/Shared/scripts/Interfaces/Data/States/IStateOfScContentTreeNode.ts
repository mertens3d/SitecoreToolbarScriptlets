import { IScContentTreeNodeCoord } from "./IScContentTreeNodeCoord";
import { IStateOfScContentTreeNodeFlat } from "./IStateOfScContentTreeNodeFlat";

export interface IStateOfScContentTreeNodeDeep extends IStateOfScContentTreeNodeFlat {
  Coord: IScContentTreeNodeCoord;
  TreeNodeChildren: IStateOfScContentTreeNodeDeep[];
}