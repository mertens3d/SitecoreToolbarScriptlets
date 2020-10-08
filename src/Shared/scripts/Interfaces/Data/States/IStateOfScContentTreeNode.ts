import { IStateOfScContentTreeNodeShallow } from "./IStateOfScContentTreeNodeFlat";

export interface IStateOfScContentTreeNodeDeep extends IStateOfScContentTreeNodeShallow {

  NodeChildren: IStateOfScContentTreeNodeDeep[];
}