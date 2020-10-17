import { ScWindowType } from "../../Enums/50 - scWindowType";
import { IStateOfScUi } from "../StateOf/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../StateOf/IStateOfStorageSnapShots";
import { IMenuCommandDefinition } from "../IMenuCommandDefinition";
import { VisiblityTestResultsBucket } from "./IUiVisiblityTestResult";
import { GuidData } from "../../Helpers/GuidData";

export interface IUiVisibilityTestAgent {
  Hydrate(stateOfSitecoreWindow: IStateOfScUi, stateOfStorageSnapShots: IStateOfStorageSnapShots, windowType: ScWindowType, selectSnapShotId: GuidData);
  TestAgainstAllSetControllers(Command: IMenuCommandDefinition): VisiblityTestResultsBucket;
}