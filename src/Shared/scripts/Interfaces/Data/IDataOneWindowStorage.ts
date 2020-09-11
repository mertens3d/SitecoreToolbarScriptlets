import { IOneStorageData } from '.././IOneStorageData';
import { IDataStateOfContentEditor } from './IDataOneStorageOneTreeState';
import { ScWindowType } from '../../Enums/scWindowType';
import { SnapShotFlavor } from '../../Enums/SnapShotFlavor';
import { GuidData } from "../../Helpers/GuidData";
import { IDataSateOfDesktop } from './IDataDesktopState';

export interface IDataStateOfSitecore {
  StateOfDesktop: IDataSateOfDesktop,
  StateOfContentEditor: IDataStateOfContentEditor,
  
  GuidId: GuidData,
  Flavor: SnapShotFlavor;
  NickName: string
  RawData: IOneStorageData,
  TimeStamp: Date,
  TimeStampFriendly: string,
  WindowFriendly: string,
  WindowType: ScWindowType,
}