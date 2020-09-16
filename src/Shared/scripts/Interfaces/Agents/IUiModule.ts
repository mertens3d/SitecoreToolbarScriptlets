import { IDataStateOfSitecoreWindow } from "../Data/States/IDataStateOfSitecoreWindow";
import { ScWindowType } from "../../Enums/scWindowType";
import { GuidData } from "../../Helpers/GuidData";

export interface IUiModule {
  Hydrate(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, currentWindowType: ScWindowType, selectSnapShotId: GuidData): void;
  Init(): void;
  RefreshUi(): void;
}