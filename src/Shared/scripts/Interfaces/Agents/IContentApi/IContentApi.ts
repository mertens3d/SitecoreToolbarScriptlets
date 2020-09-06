import { ICommandHndlrDataForContent } from "../../ICommandHndlrDataForContent";
import { PayloadDataFromPopUp } from "../../../Classes/PayloadDataReqPopUp";

export interface IHindSiteScWindowApi {
  GetContentState();
  AddCETab(commandData: ICommandHndlrDataForContent): Promise<void>
  AdminB();
  MarkFavorite(commandData: ICommandHndlrDataForContent);
  OpenContentEditor();
  Ping(payloadData: PayloadDataFromPopUp);
  RestoreSnapshop(commandData: ICommandHndlrDataForContent): Promise<void>;
  ToggleCompactCss(payloadData: PayloadDataFromPopUp);
  SaveWindowState(commandData: ICommandHndlrDataForContent): Promise<void>;
  RemoveSnapShot(commandData: ICommandHndlrDataForContent): Promise<void>;
  PublischActiveCE(commandData: ICommandHndlrDataForContent): Promise<void>;
  //UpdateNickname(commandData: ICommandHndlrDataForContent): Promise<void>;

}
