import { ScWindowType } from '../../../Enums/scWindowType';
import { SnapShotFlavor } from '../../../Enums/SnapShotFlavor';
import { GuidData } from '../../../Helpers/GuidData';
export interface IDataMetaData {
    Flavor: SnapShotFlavor;
    readonly SnapshotId: GuidData;
    SessionId: string;
    StorageKey: string;
    TimeStamp: Date;
    WindowType: ScWindowType;
}
