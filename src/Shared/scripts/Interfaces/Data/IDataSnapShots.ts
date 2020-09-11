import { IDataStateOfSitecore } from "./IDataOneWindowStorage";
export interface IDataSnapShots {
  Birthday: Date;
  CurrentSnapShots: IDataStateOfSitecore[];
  FavoriteCount: number;
  PlainCount: number,
  SnapShotsAutoCount: number;
}