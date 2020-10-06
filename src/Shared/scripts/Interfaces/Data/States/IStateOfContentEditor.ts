import { IStateOfContentTree } from './IStateOfContentTree';
import { IStateOf_ } from './IStateofX';

export interface IStateOfContentEditor extends IStateOf_{
  StateOfContentTree: IStateOfContentTree,
}