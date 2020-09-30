import { IStateOfScUiProxy } from "./IDataStateOfSitecoreWindow";

export interface IStateOfStorageSnapShots {
  CreationDate: Date;
  SnapShots: IStateOfScUiProxy[];
  FavoriteCount: number;
  PlainCount: number,
  SnapShotsAutoCount: number;
}