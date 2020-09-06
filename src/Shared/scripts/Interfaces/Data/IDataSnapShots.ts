import { IDataOneWindowStorage } from "./IDataOneWindowStorage";
export interface IDataSnapShots {
  Birthday: Date;
  CurrentSnapShots: IDataOneWindowStorage[];
  FavoriteCount: number;
  PlainCount: number,
  SnapShotsAutoCount: number;
}