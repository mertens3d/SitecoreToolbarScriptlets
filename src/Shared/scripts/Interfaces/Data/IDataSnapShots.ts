import { IDataStateOfSitecoreWindow } from "./IDataOneWindowStorage";
export interface IDataStateOfSnapShots {
  Birthday: Date;
  CurrentSnapShots: IDataStateOfSitecoreWindow[];
  FavoriteCount: number;
  PlainCount: number,
  SnapShotsAutoCount: number;
}