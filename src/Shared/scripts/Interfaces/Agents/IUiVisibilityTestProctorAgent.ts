import { ScUrlAgent } from "../../Agents/Agents/UrlAgent/ScUrlAgent";
import { IDataStateOfSitecoreWindow } from "../Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../Data/States/IDataStateOfStorageSnapShots";

export interface IUiVisibilityTestAgent {
  Prime(scUrlAgent: ScUrlAgent, stateOfSitecoreWindow: IDataStateOfSitecoreWindow, stateOfStorageSnapShots: IDataStateOfStorageSnapShots);
}