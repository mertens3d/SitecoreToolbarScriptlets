import { IDataMenuWindowPrefs } from './IDataMenuWindowPrefs';
import { IDataDebugSettings } from '../../../JsShared/Interfaces/IDataDebugSettings';
import { IDataOneSettingPair } from '../../../jsContent/Interfaces/IdataOneSetting';

export interface IDataSettings {
  MenuPrefs: IDataMenuWindowPrefs;
  DebugSettings: IDataDebugSettings,
  Accordian: IDataOneSettingPair[]
}