﻿import { IDataStateOfSitecoreWindow } from "./Data/States/IDataStateOfSitecoreWindow";
import { GuidData } from "../Helpers/GuidData";
import { IScUrlAgent } from "./Agents/IScUrlAgent/IScUrlAgent";
import { IDataStateOfStorageSnapShots } from "./Data/States/IDataStateOfStorageSnapShots";
import { IUiVisibilityTestAgent } from "./Agents/IUiVisibilityTestProctorAgent";

export class UiHydrationData {
  ScUrlAgent: IScUrlAgent;
  SelectSnapShot: GuidData;
  SelectSnapShotId: GuidData;
  StateOfSitecoreWindow: IDataStateOfSitecoreWindow;
  StateOfStorageSnapShots: IDataStateOfStorageSnapShots;
  UiVisibilityTestAgent: IUiVisibilityTestAgent;
  SelectSnapShotNickname: any;

  constructor(stateOfSitecoreWindow: IDataStateOfSitecoreWindow, scUrlAgent: IScUrlAgent, stateOfStorageSnapShots: IDataStateOfStorageSnapShots, selectSnapShotId: GuidData, uiVisiblityTestAgent: IUiVisibilityTestAgent, selectSnapShotName: string) {
    this.StateOfSitecoreWindow = stateOfSitecoreWindow;
    this.SelectSnapShot = selectSnapShotId;
    this.ScUrlAgent = scUrlAgent;
    this.StateOfStorageSnapShots = stateOfStorageSnapShots;
    this.SelectSnapShotId = selectSnapShotId;
    this.SelectSnapShotNickname = selectSnapShotName;
    this.UiVisibilityTestAgent = uiVisiblityTestAgent;
  }
}