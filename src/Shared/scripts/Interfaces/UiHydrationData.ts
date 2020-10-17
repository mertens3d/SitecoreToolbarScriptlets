import { GuidData } from "../Helpers/GuidData";
import { IUiVisibilityTestAgent } from "./Agents/IUiVisibilityTestProctorAgent";
import { IScURLResolver } from "./Jackets/IScPathResolver";
import { IScWindowTypeResolver } from "./Jackets/IScUrlAgent";
import { IStateOfScUi } from "./StateOf/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "./StateOf/IStateOfStorageSnapShots";

export class UiHydrationData {
  ScWindowTypeResolver: IScWindowTypeResolver;
  ScPathResolver: IScURLResolver;
  SelectSnapShot: GuidData;
  SelectSnapShotId: GuidData;
  SelectSnapShotNickname: any;
  StateOfLiveHindSite: IStateOfScUi;
  StateOfStorageSnapShots: IStateOfStorageSnapShots;
  UiVisibilityTestAgent: IUiVisibilityTestAgent;

  constructor(stateOfSitecoreWindow: IStateOfScUi, scWindowTypeResolver: IScWindowTypeResolver, stateOfStorageSnapShots: IStateOfStorageSnapShots, selectSnapShotId: GuidData, uiVisiblityTestAgent: IUiVisibilityTestAgent, selectSnapShotName: string, scPathResolver: IScURLResolver) {
    this.StateOfLiveHindSite = stateOfSitecoreWindow;
    this.SelectSnapShot = selectSnapShotId;
    this.ScWindowTypeResolver = scWindowTypeResolver;
    this.StateOfStorageSnapShots = stateOfStorageSnapShots;
    this.SelectSnapShotId = selectSnapShotId;
    this.SelectSnapShotNickname = selectSnapShotName;
    this.UiVisibilityTestAgent = uiVisiblityTestAgent;
    this.ScPathResolver = scPathResolver;
  }
}