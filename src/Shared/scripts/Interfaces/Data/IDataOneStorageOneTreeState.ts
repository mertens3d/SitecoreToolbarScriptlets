import { GuidData } from '../../Helpers/GuidData';
import { IDataStateOfTree } from './iDataTreeState';

export interface IDataStateOfContentEditor {
  Id: GuidData,
  StateOfTree: IDataStateOfTree,
}