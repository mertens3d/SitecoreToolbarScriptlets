import { ICommandHandlerDataForContent } from "../../ICommandHandlerDataForContent";
import { PayloadDataFromPopUp } from "../../../Classes/PayloadDataReqPopUp";

export interface IHindSiteScWindowApi {
  GetStateOfContent();
  AddCETab(commandData: ICommandHandlerDataForContent): Promise<void>
  AdminB();
  MarkFavorite(commandData: ICommandHandlerDataForContent);
  OpenContentEditor();
  Ping(payloadData: PayloadDataFromPopUp);
  SetStateOfSitecoreWindow(commandData: ICommandHandlerDataForContent): Promise<void>;
  ToggleCompactCss(payloadData: PayloadDataFromPopUp);
  SaveWindowState(commandData: ICommandHandlerDataForContent): Promise<void>;
  RemoveSnapShot(commandData: ICommandHandlerDataForContent): Promise<void>;
  PublischActiveCE(commandData: ICommandHandlerDataForContent): Promise<void>;
  //UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void>;
}