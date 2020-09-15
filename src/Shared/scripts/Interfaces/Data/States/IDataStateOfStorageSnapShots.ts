import { IDataStateOfSitecoreWindow } from "./IDataStateOfSitecoreWindow";

export interface IDataStateOfStorageSnapShots {
  CreationDate: Date;
  SnapShots: IDataStateOfSitecoreWindow[];
  FavoriteCount: number;
  PlainCount: number,
  SnapShotsAutoCount: number;
}