import { IStateOfScUi } from "../../Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../../Interfaces/StateOf/IStateOfStorageSnapShots";

export class DefaultStateOfStorageSnapshots implements IStateOfStorageSnapShots {
  CreationDate = new Date(1970);
  SnapShots: IStateOfScUi[] = [];
  FavoriteCount = 0;
  PlainCount = 0;
  SnapShotsAutoCount = 0;
}