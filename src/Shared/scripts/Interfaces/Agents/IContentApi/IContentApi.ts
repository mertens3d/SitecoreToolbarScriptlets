import { IApiCommandPayload, InternalCommandPayload } from "../../ICommandHandlerDataForContent";
import { IDataStateOfSitecoreWindow } from "../../Data/States/IDataStateOfSitecoreWindow";

export interface ISnapShotsAgent {

  SetNickName(commandData: InternalCommandPayload): Promise<void>;
  //ToggleFavorite(commandData: IApiCommandPayload);
  //RemoveSnapShot(commandData: IApiCommandPayload): Promise<void>;

}
export interface IHindSiteScWindowApi {
  AddCETab(commandData: IApiCommandPayload): Promise<void>
  AdminB();
  DebugForceAutoSnapShot(commandData: IApiCommandPayload): Promise<void>;
  GetStateOfContent();
  OpenContentEditor();
  Ping();
  PublischActiveCE(commandData: IApiCommandPayload): Promise<void>;
  SaveWindowState(commandData: IApiCommandPayload): Promise<void>;
  SetStateOfSitecoreWindow(commandData: IApiCommandPayload, dataOneWindowStorage: IDataStateOfSitecoreWindow): Promise<void>;
  ToggleCompactCss(commandData: IApiCommandPayload);
}