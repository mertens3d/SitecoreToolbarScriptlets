import { IStateOfScUi } from "./Data/States/IDataStateOfSitecoreWindow";
import { GuidData } from "../Helpers/GuidData";
import { IScUrlAgent } from "./Jackets/IScUrlAgent";
import { IStateOfStorageSnapShots } from "./Data/States/IStateOfStorageSnapShots";
import { IUiVisibilityTestAgent } from "./Agents/IUiVisibilityTestProctorAgent";

export class UiHydrationData {
  ScUrlAgent: IScUrlAgent;
  SelectSnapShot: GuidData;
  SelectSnapShotId: GuidData;
  SelectSnapShotNickname: any;
  StateOfLiveHindSite: IStateOfScUi;
  StateOfStorageSnapShots: IStateOfStorageSnapShots;
  UiVisibilityTestAgent: IUiVisibilityTestAgent;

  constructor(stateOfSitecoreWindow: IStateOfScUi, scUrlAgent: IScUrlAgent, stateOfStorageSnapShots: IStateOfStorageSnapShots, selectSnapShotId: GuidData, uiVisiblityTestAgent: IUiVisibilityTestAgent, selectSnapShotName: string) {
    this.StateOfLiveHindSite = stateOfSitecoreWindow;
    this.SelectSnapShot = selectSnapShotId;
    this.ScUrlAgent = scUrlAgent;
    this.StateOfStorageSnapShots = stateOfStorageSnapShots;
    this.SelectSnapShotId = selectSnapShotId;
    this.SelectSnapShotNickname = selectSnapShotName;
    this.UiVisibilityTestAgent = uiVisiblityTestAgent;
  }
}