import { ContentMessageBroker } from "../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { ContentAtticManager } from "../../../Content/scripts/Managers/ContentAtticManager/ContentAtticManager";
import { OneScWindowManager } from "../../../Content/scripts/Managers/OneScWindowManager";
import { SitecoreUiManager } from "../../../Content/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { PayloadDataFromPopUp } from "../Classes/PayloadDataReqPopUp";
import { ILoggerAgent } from "./Agents/ILoggerBase";
import { IToastAgent } from "./Agents/IToastAgent";
import { IDataOneDoc } from "./IDataOneDoc";
import { IFactoryHelper } from "./IFactoryHelper";
import { IRecipeBasics } from "./IPromiseHelper";

export interface ICommandHndlrDataForContent {
  ScWinMan: OneScWindowManager;
  ScUiMan: SitecoreUiManager;
  FactoryHelp: IFactoryHelper;
  ToastAgent: IToastAgent;
  AtticMan: ContentAtticManager;
  Logger: ILoggerAgent;
  PayloadData: PayloadDataFromPopUp,
  ContentMessageBroker: ContentMessageBroker,
  TopLevelDoc: IDataOneDoc,
  PromiseBasic: IRecipeBasics
}