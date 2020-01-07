import { IDataMenuWindowPrefs } from './IDataMenuWindowPrefs';

export interface IDataSettings {
  MenuPrefs: IDataMenuWindowPrefs;
  DebugSettings: IDataDebugSettings,
  Accordian: IDataOneSettingPair[]
}