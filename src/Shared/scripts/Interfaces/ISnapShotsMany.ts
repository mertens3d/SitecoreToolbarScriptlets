import { IDataOneWindowStorage } from "./IDataOneWindowStorage";
export interface ISnapShotsMany {
  Birthday: Date;
  CurrentSnapShots: IDataOneWindowStorage[];
  FavoriteCount: number;
  PlainCount: number,
  SnapShotsAutoCount: number;
}