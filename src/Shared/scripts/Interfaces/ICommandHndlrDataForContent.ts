﻿import { ContentMessageBroker } from "../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { ContentHub } from "../../../Content/scripts/Managers/ContentHub/ContentHub";
import { PayloadDataFromPopUp } from "../Classes/PayloadDataReqPopUp";
import { ILoggerAgent } from "./Agents/ILoggerBase";
import { IDataOneDoc } from "./IDataOneDoc";
import { IPromisesBasic } from "./IPromiseHelper";

export interface ICommandHndlrDataForContent {
  Logger: ILoggerAgent;
  PayloadData: PayloadDataFromPopUp,
  ContentMessageBroker: ContentMessageBroker,
  TopLevelDoc: IDataOneDoc,
  ContentHub: ContentHub,
  PromiseBasic: IPromisesBasic
}