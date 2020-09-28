import { IDataStateOfLiveHindSite } from "./IDataStateOfSitecoreWindow";

export interface IDataStateOfStorageSnapShots {
  CreationDate: Date;
  SnapShots: IDataStateOfLiveHindSite[];
  FavoriteCount: number;
  PlainCount: number,
  SnapShotsAutoCount: number;
}