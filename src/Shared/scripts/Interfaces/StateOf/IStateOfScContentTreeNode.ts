import { IStateOfScContentTreeNodeShallow } from "./IStateOfScContentTreeNodeShallow";

export interface IStateOfScContentTreeNodeDeep extends IStateOfScContentTreeNodeShallow {

  NodeChildren: IStateOfScContentTreeNodeDeep[];
}