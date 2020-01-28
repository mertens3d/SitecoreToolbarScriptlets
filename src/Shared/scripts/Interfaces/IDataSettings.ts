import { IDataMenuWindowPrefs } from './IDataMenuWindowPrefs';
import { IDataDebugSettings } from '../../../Shared/Scripts/Interfaces/IDataDebugSettings';
import { IDataOneSettingPair } from './IdataOneSetting';

export interface IDataSettings {
  MenuPrefs: IDataMenuWindowPrefs;
  DebugSettings: IDataDebugSettings,
  Accordian: IDataOneSettingPair[]
}