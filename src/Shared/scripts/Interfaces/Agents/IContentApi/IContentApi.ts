import { IApiCallPayload, IInternalCommandPayload } from "../../ICommandHandlerDataForContent";
import { IDataStateOfSitecoreWindow } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";

export interface ISnapShotsAgent {

  SetNickName(commandData: IInternalCommandPayload): Promise<void>;
  //ToggleFavorite(commandData: IApiCommandPayload);
  //RemoveSnapShot(commandData: IApiCommandPayload): Promise<void>;
  //DebugForceAutoSnapShot(commandData: IApiCallPayload): Promise<void>;

}
export interface IHindSiteScWindowApi {
  GetStateOfSitecoreWindow(Manual: SnapShotFlavor);
  OnReadyInitScWindowManager(): any;
  RaiseToastNotification(arg0: string): any;
  AddCETab(commandData: IApiCallPayload): Promise<void>
  AdminB(commandData: IApiCallPayload);
  GetStateOfScWindow();
  OpenContentEditor();
  Ping();
  PublischActiveCE(commandData: IApiCallPayload): Promise<void>;
  
  SetStateOfSitecoreWindowAsync(commandData: IApiCallPayload, dataOneWindowStorage: IDataStateOfSitecoreWindow): Promise<void>;
  ToggleCompactCss(commandData: IApiCallPayload);
}