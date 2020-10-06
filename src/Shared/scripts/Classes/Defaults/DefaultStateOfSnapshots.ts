import { IStateOfStorageSnapShots } from "../../Interfaces/Data/States/IStateOfStorageSnapShots";

export class DefaultStateOfStorageSnapshots implements IStateOfStorageSnapShots {
    CreationDate = new Date(1970);
    SnapShots = [];
    FavoriteCount = 0;
    PlainCount = 0;
    SnapShotsAutoCount = 0;
}
