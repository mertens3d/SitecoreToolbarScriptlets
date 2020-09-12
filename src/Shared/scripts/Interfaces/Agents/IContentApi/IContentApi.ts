import { ICommandHndlrDataForContent } from "../../ICommandHndlrDataForContent";
import { PayloadDataFromPopUp } from "../../../Classes/PayloadDataReqPopUp";

export interface IHindSiteScWindowApi {
  GetStateOfContent();
  AddCETab(commandData: ICommandHndlrDataForContent): Promise<void>
  AdminB();
  MarkFavorite(commandData: ICommandHndlrDataForContent);
  OpenContentEditor();
  Ping(payloadData: PayloadDataFromPopUp);
  SetStateOfSitecoreWindow(commandData: ICommandHndlrDataForContent): Promise<void>;
  ToggleCompactCss(payloadData: PayloadDataFromPopUp);
  SaveWindowState(commandData: ICommandHndlrDataForContent): Promise<void>;
  RemoveSnapShot(commandData: ICommandHndlrDataForContent): Promise<void>;
  PublischActiveCE(commandData: ICommandHndlrDataForContent): Promise<void>;
  //UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void>;

}
