import { IDataStateOfSnapShots } from "../../Interfaces/Data/IDataSnapShots";

export class DefaultStateOfSnapshots implements IDataStateOfSnapShots {
    Birthday = new Date(1970);
    CurrentSnapShots = [];
    FavoriteCount = 0;
    PlainCount = 0;
    SnapShotsAutoCount = 0;
}
