import { IStateOfScContentTreeNodeFlat } from "./IStateOfScContentTreeNodeFlat";

export interface IStateOfScContentTreeNodeDeep extends IStateOfScContentTreeNodeFlat {

  NodeChildren: IStateOfScContentTreeNodeDeep[];
}