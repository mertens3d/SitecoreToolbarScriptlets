import { ContentMessageBroker } from "../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { SitecoreUiManager } from "../../../Content/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { GuidData } from "../Helpers/GuidData";
import { IContentAtticAgent } from "./Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "./Agents/ILoggerBase";
import { IScWindowManager } from "./Agents/IScWindowManager/IScWindowManager";
import { IToastAgent } from "./Agents/IToastAgent";
import { IDataOneDoc } from "./IDataOneDoc";
import { IRecipeBasics } from "./IPromiseHelper";

export interface ICommandHndlrDataForContent {
  TargetSnapShotFlavor: SnapShotFlavor,
  TargetSnapShotId: GuidData;
  TargetNickName: string;
  ScWinMan: IScWindowManager;
  ScUiMan: SitecoreUiManager;
  ToastAgent: IToastAgent;
  AtticAgent: IContentAtticAgent;
  Logger: ILoggerAgent;
  ContentMessageBroker: ContentMessageBroker,
  TopLevelDoc: IDataOneDoc,
  RecipeBasics: IRecipeBasics
  //CurrentPageType: scWindowType
}