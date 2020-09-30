import { IStateOfScUiProxy } from "./IDataStateOfSitecoreWindow";

export interface IStateOfStorageSnapShots {
  CreationDate: Date;
  FavoriteCount: number;
  PlainCount: number,
  SnapShots: IStateOfScUiProxy[];
  SnapShotsAutoCount: number;
}