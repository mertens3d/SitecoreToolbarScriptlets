import { IDataDebugSettings } from '../../../Shared/Scripts/Interfaces/IDataDebugSettings';
import { IDataOneSettingPair } from './IdataOneSetting';
import { IDataContentPrefs } from './IDataContentPrefs';

export interface IDataPopUpSettings {
  DebugSettings: IDataDebugSettings,
  Accordian: IDataOneSettingPair[]
  ContentPrefs: IDataContentPrefs;
}