import { IDataStateOfStorageSnapShots } from "../../Interfaces/Data/States/IDataStateOfStorageSnapShots";

export class DefaultStateOfSnapshotStorage implements IDataStateOfStorageSnapShots {
    CreationDate = new Date(1970);
    SnapShots = [];
    FavoriteCount = 0;
    PlainCount = 0;
    SnapShotsAutoCount = 0;
}
