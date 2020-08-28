import { PayloadDataFromPopUp } from "../Classes/PayloadDataReqPopUp";
import { ContentMessageBroker } from "../../../Content/scripts/Drones/ContentMessageBroker/ContentMessageBroker";
import { IDataOneDoc } from "./IDataOneDoc";
import { ContentHub } from "../../../Content/scripts/Managers/ContentHub/ContentHub";

export interface ICommandHndlrDataForContent {
  PayloadData: PayloadDataFromPopUp,
  ContentMessageBroker: ContentMessageBroker,
  TopLevelDoc: IDataOneDoc,
  ContentHub: ContentHub

}
