import { IDataStateOfSitecoreWindow } from "./IDataOneWindowStorage";
export interface IDataStateOfSnapShots {
  Birthday: Date;
  SnapShots: IDataStateOfSitecoreWindow[];
  FavoriteCount: number;
  PlainCount: number,
  SnapShotsAutoCount: number;
}