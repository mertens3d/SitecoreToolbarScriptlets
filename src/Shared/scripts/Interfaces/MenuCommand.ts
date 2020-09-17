import { IDataStateOfSitecoreWindow } from "./Data/States/IDataStateOfSitecoreWindow";
import { GuidData } from "../Helpers/GuidData";
import { IScUrlAgent } from "./Agents/IScUrlAgent/IScUrlAgent";
import { IDataStateOfStorageSnapShots } from "./Data/States/IDataStateOfStorageSnapShots";
import { IUiVisibilityTestAgent } from "./Agents/IUiVisibilityTestProctorAgent";

export class UiRefreshData {
  ScUrlAgent: IScUrlAgent;
  SelectSnapShot: GuidData;
  SelectSnapShotId: GuidData;
  StateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  StateOfStorageSnapShots: IDataStateOfStorageSnapShots;
  UiVisibilityTestAgent: IUiVisibilityTestAgent;

  constructor(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, SelectSnapShot: GuidData, scUrlAgent: IScUrlAgent, stateOfStorageSnapShots: IDataStateOfStorageSnapShots, selectSnapShotId: GuidData, uiVisiblityTestAgent: IUiVisibilityTestAgent) {
    this.StateOfSitecoreWindow = stateOfSitecoreWindow;
    this.SelectSnapShot = SelectSnapShot;
    this.ScUrlAgent = scUrlAgent;
    this.StateOfStorageSnapShots = stateOfStorageSnapShots;
    this.SelectSnapShotId = selectSnapShotId;
    this.UiVisibilityTestAgent = uiVisiblityTestAgent;
  }
}

