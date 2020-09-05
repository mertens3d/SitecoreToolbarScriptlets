import { IDataOneWindowStorage } from "../IDataOneWindowStorage";
export interface ISnapShots {
  Birthday: Date;
  CurrentSnapShots: IDataOneWindowStorage[];
  FavoriteCount: number;
  PlainCount: number,
  SnapShotsAutoCount: number;
}