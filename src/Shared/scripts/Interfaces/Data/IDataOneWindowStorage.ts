import { IOneStorageData } from '.././IOneStorageData';
import { IDataStateOfContentEditor } from './IDataOneStorageOneTreeState';
import { ScWindowType } from '../../Enums/scWindowType';
import { SnapShotFlavor } from '../../Enums/SnapShotFlavor';
import { GuidData } from "../../Helpers/GuidData";
import { IDataStateOfDesktop } from './IDataDesktopState';
import { IDataStateOfSnapShots } from './IDataSnapShots';

export interface IDataStateOfSitecoreWindow {
  StateOfDesktop: IDataStateOfDesktop,
  StateOfContentEditor: IDataStateOfContentEditor,
  StateOfSnapShots: IDataStateOfSnapShots,

  GuidId: GuidData,
  Flavor: SnapShotFlavor;
  NickName: string
  RawData: IOneStorageData,
  TimeStamp: Date,
  TimeStampFriendly: string,
  WindowFriendly: string,
  WindowType: ScWindowType,
}