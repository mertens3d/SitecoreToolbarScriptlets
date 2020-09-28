import { ScWindowType } from "../../Enums/scWindowType";
import { IDataStateOfLiveHindSite } from "../Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../Data/States/IDataStateOfStorageSnapShots";
import { IMenuCommandDefinition } from "../IMenuCommandDefinition";
import { VisiblityTestResultsBucket } from "./IUiVisiblityTestResult";
import { GuidData } from "../../Helpers/GuidData";

export interface IUiVisibilityTestAgent {
  Hydrate(stateOfSitecoreWindow: IDataStateOfLiveHindSite, stateOfStorageSnapShots: IDataStateOfStorageSnapShots, windowType: ScWindowType, selectSnapShotId: GuidData);
  TestAgainstAllSetControllers(Command: IMenuCommandDefinition): VisiblityTestResultsBucket;
}