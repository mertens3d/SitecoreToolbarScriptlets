import { ScWindowType } from '../../../Enums/5000 - scWindowType';
import { SnapShotFlavor } from '../../../Enums/SnapShotFlavor';
import { GuidData } from '../../../Helpers/GuidData';
export interface IDataMetaData {
  Hash: number;
  Flavor: SnapShotFlavor;
  readonly SnapshotId: GuidData;
  SessionId: string;
  StorageKey: string;
  TimeStamp: Date;
  StorageId: GuidData;
  WindowType: ScWindowType;
  
}