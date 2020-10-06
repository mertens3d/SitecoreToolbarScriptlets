import { IStateOfScUi } from "./IDataStateOfSitecoreWindow";

export interface IStateOfStorageSnapShots {
  CreationDate: Date;
  FavoriteCount: number;
  PlainCount: number,
  SnapShots: IStateOfScUi[];
  SnapShotsAutoCount: number;
}