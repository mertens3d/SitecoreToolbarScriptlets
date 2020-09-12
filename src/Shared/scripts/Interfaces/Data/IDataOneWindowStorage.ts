import { ScWindowType } from '../../Enums/scWindowType';
import { SnapShotFlavor } from '../../Enums/SnapShotFlavor';
import { IDataStateOfDesktop } from './IDataDesktopState';
import { IDataStateOfContentEditor } from './IDataOneStorageOneTreeState';
import { GuidData } from '../../Helpers/GuidData';

export interface IDataFriendly {
  Flavor: string;
  NickName: string
  TimeStamp: string,
  WindowType: string,
}
export interface IDataMetaData {
  Flavor: SnapShotFlavor;
  readonly SnapshotId: GuidData,
  SessionId: string,
  StorageKey: string,
  TimeStamp: Date,
  WindowType: ScWindowType,
}
export interface IDataStateOfSitecoreWindow {
  Friendly: IDataFriendly,
  Meta: IDataMetaData
  StateOfContentEditor: IDataStateOfContentEditor,
  StateOfDesktop: IDataStateOfDesktop,
}