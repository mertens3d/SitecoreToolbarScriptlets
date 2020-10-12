import { IStateOfContentTree } from './IStateOfContentTree';
import { IStateOf_ } from "./IStateOf_";

export interface IStateOfContentTreeBasedProxies extends IStateOf_ {
    ContentTree: IStateOfContentTree;
}
