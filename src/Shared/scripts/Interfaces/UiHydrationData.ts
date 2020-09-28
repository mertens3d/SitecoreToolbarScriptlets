import { IDataStateOfLiveHindSite } from "./Data/States/IDataStateOfSitecoreWindow";
import { GuidData } from "../Helpers/GuidData";
import { IScUrlAgent } from "./Agents/IScUrlAgent/IScUrlAgent";
import { IDataStateOfStorageSnapShots } from "./Data/States/IDataStateOfStorageSnapShots";
import { IUiVisibilityTestAgent } from "./Agents/IUiVisibilityTestProctorAgent";

export class UiHydrationData {
  ScUrlAgent: IScUrlAgent;
  SelectSnapShot: GuidData;
  SelectSnapShotId: GuidData;
  StateOfLiveHindSite: IDataStateOfLiveHindSite;
  StateOfStorageSnapShots: IDataStateOfStorageSnapShots;
  UiVisibilityTestAgent: IUiVisibilityTestAgent;
  SelectSnapShotNickname: any;

  constructor(stateOfSitecoreWindow: IDataStateOfLiveHindSite, scUrlAgent: IScUrlAgent, stateOfStorageSnapShots: IDataStateOfStorageSnapShots, selectSnapShotId: GuidData, uiVisiblityTestAgent: IUiVisibilityTestAgent, selectSnapShotName: string) {
    this.StateOfLiveHindSite = stateOfSitecoreWindow;
    this.SelectSnapShot = selectSnapShotId;
    this.ScUrlAgent = scUrlAgent;
    this.StateOfStorageSnapShots = stateOfStorageSnapShots;
    this.SelectSnapShotId = selectSnapShotId;
    this.SelectSnapShotNickname = selectSnapShotName;
    this.UiVisibilityTestAgent = uiVisiblityTestAgent;
  }
}