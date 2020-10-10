import { ScWindowType } from "../../Enums/50 - scWindowType";
import { SnapShotFlavor } from "../../Enums/SnapShotFlavor";
import { IDataMetaData } from "../../Interfaces/Data/States/IDataMetaData";
import { Guid } from "../../Helpers/Guid";

export class DefaultMetaData implements IDataMetaData {
  Flavor = SnapShotFlavor.Live;
  SessionId = '';
  SnapshotId = Guid.NewRandomGuid();
  StorageKey = '';
  TimeStamp = null;
  WindowType = ScWindowType.Unknown;
  Hash = -1;
  StorageId = Guid.NewRandomGuid();
}